// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getGoogleAuthURL, getGoogleAccessToken } = require('../middleware/googleAuth');
const { createGoogleCalendarEvent, listGoogleCalendarEvents } = require('../services/googleCalendar');

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

     // Hash the password before saving
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Error registering user:', err.message);
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // Log the user object to confirm it's being fetched
    console.log('User found during login:', user);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Log the role to ensure it's present
    console.log('User role during login:', user.role);

    // Create payload with user ID and role
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Ensure this value is set correctly
      },
    };

    // Sign the JWT token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        // Send the token and role back to the frontend
        res.json({ token, role: user.role }); // Confirm role is sent here
      }
    );
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
