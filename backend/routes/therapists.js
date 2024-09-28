// backend/routes/therapists.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure correct path
const Therapist = require('../models/Therapist'); // Ensure correct path
const auth = require('../middleware/auth'); // Authentication middleware
const roleCheck = require('../middleware/roleCheck'); // Role-checking middleware

// Route to get all therapists, accessible by specific roles (e.g., admin or patient)
router.get('/', auth, roleCheck(['admin', 'patient', 'therapist']), async (req, res) => {
  try {
    // Fetch therapists and populate with related user info if needed
    const therapists = await Therapist.find().populate('user', 'name email');
    if (therapists.length === 0) {
      return res.status(404).json({ message: 'No therapists found' });
    }
    res.status(200).json(therapists);
  } catch (error) {
    console.error('Error fetching therapists:', error);
    res.status(500).json({ error: 'Failed to fetch therapists' });
  }
});

module.exports = router;
