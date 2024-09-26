// routes/therapists.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Make sure the path to your model is correct
const Therapist = require('../models/Therapist'); // Make sure the path to your model is correct
const auth = require('../middleware/auth'); // Authentication middleware
const roleCheck = require('../middleware/roleCheck'); // Role-checking middleware

// Route to get all therapists, accessible only by admin role
router.get('/', auth, roleCheck('admin'), async (req, res) => {
    try {
      const therapists = await User.find({ role: 'therapist' }); // Adjust the query based on how therapists are defined in the User model
      res.status(200).json(therapists);
    } catch (error) {
      console.error('Error fetching therapists:', error);
      res.status(500).json({ error: 'Failed to fetch therapists' });
    }
  });

// Additional route (if needed) to fetch all therapists without admin restriction
// This route is purely for reference and should be secured in production environments.
router.get('/all', auth, async (req, res) => {
  try {
    const therapists = await Therapist.find();
    res.status(200).json(therapists);
  } catch (error) {
    console.error('Error fetching therapists:', error);
    res.status(500).json({ error: 'Failed to fetch therapists' });
  }
});

module.exports = router;
