// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed
const Therapist = require('../models/Therapist'); // Correctly import the Therapist model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getGoogleAuthURL, getGoogleAccessToken } = require('../middleware/googleAuth');
const { createGoogleCalendarEvent, listGoogleCalendarEvents } = require('../services/googleCalendar');
const auth = require('../middleware/auth'); // Middleware for authentication
const sendEmail = require('../utils/sendEmail'); // Import the sendEmail utility

// Route to get Google Authentication URL
router.get('/google', (req, res) => {
  const authURL = getGoogleAuthURL();
  res.redirect(authURL);
});

// Callback route after Google authentication
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokens = await getGoogleAccessToken(code);
    res.status(200).json({ message: 'Google authentication successful', tokens });
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});

// Route to create a calendar event
router.post('/calendar/create', async (req, res) => {
  try {
    const event = await createGoogleCalendarEvent(req.body);
    res.status(200).json({ message: 'Event created successfully', event });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create calendar event' });
  }
});

// Route to list calendar events
router.get('/calendar/list', async (req, res) => {
  try {
    const events = await listGoogleCalendarEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list calendar events' });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    console.log('Missing required fields:', { name, email, password, role });
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists with email:', email);
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();

    if (role === 'therapist') {
      try {
        const newTherapist = new Therapist({ user: newUser._id, email: newUser.email });
        await newTherapist.save();
        newUser.therapist = newTherapist._id;
        await newUser.save();
        console.log('Therapist data saved successfully:', newTherapist);
      } catch (therapistError) {
        console.error('Error saving therapist data:', therapistError);
        // Optional: Rollback user creation if therapist creation fails
        await User.findByIdAndDelete(newUser._id);
        return res.status(500).json({ error: 'Failed to create therapist data. Registration unsuccessful.' });
      }
    }

    res.status(201).json({ msg: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});


// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('Missing email or password.');
    return res.status(400).json({ msg: 'Please provide both email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // Compare provided password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for user:', email);
      return res.status(400).json({ msg: 'Invalid credentials.' });
    }

    // Generate JWT token
    const payload = { user: { id: user._id, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      console.log('Login successful for user:', email);
      res.json({ token, role: user.role });
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
});

// Password change route
router.put('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Save the updated user
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Create a password reset token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Update user with the reset token and expiration time
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send password reset email
    const resetLink = `http://localhost:3000/reset-password/${token}`;
    const subject = 'Password Reset Request';
    const text = `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}`;

    await sendEmail(email, subject, text);

    res.json({ msg: 'Password reset link has been sent to your email.' });
  } catch (error) {
    console.error('Error in forgot password:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Reset password route
router.put('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the token and ensure it hasn't expired
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear the reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user
    await user.save();

    res.json({ msg: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;