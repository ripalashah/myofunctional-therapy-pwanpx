// testFindUser.js
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if necessary to point to your User model

// MongoDB connection string (update with your correct connection string)
const mongoURI = 'mongodb://localhost:27017/myofunctional_therapy_db'; 

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB successfully.');

    try {
      // Perform a query to find the user by email (update with a test email from your database)
      const emailToTest = 'ripal@wmt.com'; // Replace with an email that exists in your database
      const user = await User.findOne({ email: emailToTest });

      // Log the user object to verify the data
      console.log('User found:', user);

      // Check if the user and role are defined
      if (user) {
        console.log('User role:', user.role); // Ensure the role is being logged
      } else {
        console.log('No user found with the specified email.');
      }
    } catch (err) {
      console.error('Error fetching user:', err.message);
    } finally {
      // Disconnect from the database
      mongoose.disconnect();
    }
  })
  .catch(err => console.error('MongoDB connection error:', err));
