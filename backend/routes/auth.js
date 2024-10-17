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
    const newUser = new User({ name, email, password, role });

    // Save the user document
    await newUser.save();

    // If the role is 'therapist', create the corresponding therapist document
    if (role === 'therapist') {
      // Check if a therapist with the same email already exists
      const existingTherapist = await Therapist.findOne({ email });
      if (existingTherapist) {
        return res.status(400).json({ msg: 'Therapist with this email already exists' });
      }

      // Create a new therapist document linked to the user
      const newTherapist = new Therapist({
        user: newUser._id, // Link to the user ID
        email: newUser.email, // Set email from the newly created user
        specialty: 'Default Specialty', // Set default values or allow customization during registration
        availability: [{ day: 'Monday', startTime: '9:00 AM', endTime: '5:00 PM' }], // Example availability
      });

      // Save the therapist document
      await newTherapist.save();

      // Update the user to reference the therapist
      newUser.therapist = newTherapist._id;
      await newUser.save(); // Save the updated user document
    }

    // Respond with success message
    res.status(201).json({ msg: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error.message); // Log detailed error
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
    const userId = req.user.id; // Extracted from the auth middleware

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the current password is correct
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash the new password
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

module.exports = router;
