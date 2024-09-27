// syncTherapists.js
const mongoose = require('mongoose');
const User = require('../models/User'); // Ensure this path is correct
const Therapist = require('../models/Therapist'); // Ensure this path is correct

// Load environment variables from the .env file located in the root directory
require('dotenv').config({ path: '../.env' });

console.log('MONGO_URI:', process.env.MONGO_URI);

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is undefined. Please ensure it is set in the .env file.');
  process.exit(1);
}

// Connect to MongoDB using the connection string from .env file
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the script if the connection fails
  });

const syncTherapists = async () => {
  try {
    // Find all users with the role 'therapist'
    const therapistUsers = await User.find({ role: 'therapist' });
    console.log(`Number of therapist users found: ${therapistUsers.length}`);

    for (const user of therapistUsers) {
      // Check if the user already has a linked therapist
      const existingTherapist = await Therapist.findOne({ user: user._id });
      if (existingTherapist) {
        console.log(`User ${user.name} already has a linked therapist.`);
        continue;
      }

      // Check if the user's email is valid and not null
      if (!user.email || user.email.trim() === '') {
        console.error(`User ${user.name} does not have a valid email. Skipping therapist creation.`);
        continue;
      }

      // Check if a therapist with the same email already exists
      const emailExists = await Therapist.findOne({ email: user.email });
      if (emailExists) {
        console.error(`Therapist with email ${user.email} already exists. Skipping creation.`);
        continue;
      }

      // Create a new therapist document linked to the user
      const therapist = new Therapist({
        user: user._id,
        name: user.name,
        email: user.email, // Ensure the email is correctly set
        specialty: 'Default Specialty', // Example default field, update as needed
        availability: [{ day: 'Monday', time: '9:00 AM - 5:00 PM' }], // Example availability, adjust as needed
      });

      // Save the therapist document
      await therapist.save();
      console.log(`Therapist created for user: ${user.name}`);
    }

    console.log('Therapist synchronization completed successfully.');
  } catch (error) {
    console.error('Error syncing therapists:', error);
  } finally {
    mongoose.disconnect();
  }
};

syncTherapists();
