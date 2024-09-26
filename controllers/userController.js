// controllers/userController.js
const User = require('../models/User');
const Therapist = require('../models/Therapist');

// Function to create a new therapist user
const createTherapistUser = async (req, res) => {
  try {
    // Create the user document
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password, // Assume this is hashed
      role: 'therapist',
    });

    // Save the user to the database
    await user.save();

    // Create the therapist document linked to the user
    const therapist = new Therapist({
      user: user._id,
      specialty: req.body.specialty,
      availability: req.body.availability,
    });

    // Save the therapist to the database
    await therapist.save();

    // Update the user document to reference the therapist
    user.therapist = therapist._id;
    await user.save();

    res.status(201).json({ message: 'Therapist user created successfully', user, therapist });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create therapist user' });
  }
};
