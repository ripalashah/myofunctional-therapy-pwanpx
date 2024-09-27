// backend/controllers/userController.js
const User = require('../models/User');
const Therapist = require('../models/Therapist');

// Function to create a new therapist user
const createTherapistUser = async (req, res) => {
  try {
    const { name, email, password, specialty, availability } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create the user document
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'therapist',
    });

    // Save the user to the database
    await user.save();

    // Create the therapist document linked to the user
    const therapist = new Therapist({
      user: user._id,
      specialty: specialty || 'Default Specialty', // Default specialty if not provided
      availability: availability || [{ day: 'Monday', startTime: '09:00', endTime: '17:00' }], // Default availability if not provided
    });

    // Save the therapist to the database
    await therapist.save();

    // Update the user document to reference the therapist
    user.therapist = therapist._id;
    await user.save();

    res.status(201).json({ message: 'Therapist user created successfully', user, therapist });
  } catch (error) {
    console.error('Error creating therapist user:', error); // Log error for debugging
    res.status(500).json({ error: 'Failed to create therapist user' });
  }
};

module.exports = { createTherapistUser };
