// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust path if needed
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

    // Create a new user
    const newUser = new User({ name, email, password, role });
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
  
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide both email and password' });
    }
  
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Generate JWT
      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Send token back
      res.json({ token });
    } catch (err) {
      console.error('Error during login:', err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
