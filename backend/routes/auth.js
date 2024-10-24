// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed
const Therapist = require('../models/Therapist'); // Correctly import the Therapist model
const Patient = require('../models/Patient'); // Add this import for the Patient model
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

  // Validate required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create a new user with hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    // Save the user document
    await newUser.save();

    // Role-specific handling
    if (role === 'patient') {
      // Create a new Patient entry
      const newPatient = new Patient({
        name,
        email,
        userId: newUser._id, // Link to the user ID
      });

      // Save the Patient document
      await newPatient.save();
    } else if (role === 'therapist') {
      // Check if a therapist with the same email already exists
      const existingTherapist = await Therapist.findOne({ email });
      if (existingTherapist) {
        return res.status(400).json({ msg: 'Therapist with this email already exists' });
      }

      // Create a new Therapist entry linked to the user
      const newTherapist = new Therapist({
        user: newUser._id, // Link to the user ID
        email: newUser.email,
        specialty: 'Default Specialty', // Example default value
        availability: [{ day: 'Monday', startTime: '9:00 AM', endTime: '5:00 PM' }], // Example availability
      });

      // Save the Therapist document
      await newTherapist.save();

      // Update the user to reference the therapist
      newUser.therapist = newTherapist._id;
      await newUser.save(); // Save the updated user document
    } else if (role === 'referral-source') {
      // Handle referral-source-specific logic if any
      // Currently, no additional data is being saved, but you can add more logic here if needed
      console.log('Referral source registered:', newUser.email);
    }

    // Respond with success message
    res.status(201).json({ msg: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please provide both email and password' });
  }

  try {
    // Trim and perform case-insensitive search for email
    const emailTrimmed = email.trim();
    console.log('Searching for user with email:', emailTrimmed);

    const user = await User.findOne({ email: { $regex: new RegExp(`^${emailTrimmed}$`, 'i') } });

    console.log('User found during login:', user);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials. User not found.' });
    }

    // Compare entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password comparison result:', isMatch);

     
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials. Password does not match.' });
    }

    console.log('User role during login:', user.role);

    // Create JWT payload with user ID and role
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    console.log('Signing JWT token with payload:', payload);

    // Sign the JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.error('Error signing JWT:', err);
          throw err;
        }

        console.log('Generated JWT token:', token);

        // Send the token and role back to the frontend
        res.json({ token, role: user.role });
      }
    );
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
    console.log('User ID from token:', userId);

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found with ID:', userId);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('Current hashed password in DB:', user.password);

    // Check if the current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    console.log('Current password comparison result:', isMatch);
    if (!isMatch) {
      console.log('Current password is incorrect for user:', userId);
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    // Ensure new password is different from the current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      console.log('New password is the same as the current password for user:', userId);
      return res.status(400).json({ success: false, message: 'New password must be different from the current password' });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;

    // Update the passwordChangedAt timestamp
    user.passwordChangedAt = Date.now();

    // Log the new hashed password before saving
    console.log('New hashed password to be saved:', hashedNewPassword);

    // Save the updated user
    await user.save();
    console.log('Password changed successfully for user:', userId);

    // Update the corresponding role's database if needed
    if (user.role === 'patient') {
      await Patient.findOneAndUpdate(
        { userId: user._id },
        { $set: { passwordChangedAt: user.passwordChangedAt } }
      );
      console.log('Password change timestamp updated for patient:', userId);
    } else if (user.role === 'therapist') {
      await Therapist.findOneAndUpdate(
        { user: user._id },
        { $set: { passwordChangedAt: user.passwordChangedAt } }
      );
      console.log('Password change timestamp updated for therapist:', userId);
    } else if (user.role === 'referral-source') {
      // If there's additional logic for referral-source, you can add it here
      console.log('Password change for referral source does not require additional updates.');
    }

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ success: false, message: 'Server error' });
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