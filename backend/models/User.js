// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema for User
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true, // Removes leading/trailing spaces
    match: [/.+@.+\..+/, 'Please enter a valid email address'], // Validates email format
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
  role: {
    type: String,
    enum: ['patient', 'therapist', 'referral-source'],
    required: true,
  },
  therapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Therapist', // Therapist reference if applicable
  },
  resetPasswordToken: {
    type: String,
    default: null, // Token for password reset functionality
  },
  resetPasswordExpires: {
    type: Date,
    default: null, // Expiry time for password reset token
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, // Automatically creates 'createdAt' and 'updatedAt' fields
});

// Pre-save middleware to hash password before saving the user document
UserSchema.pre('save', async function (next) {
  // Only hash the password if it has been modified or it's new
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Hash the password with a salt factor of 10
    this.password = await bcrypt.hash(this.password, 10);
    next(); // Proceed to save after hashing
  } catch (err) {
    return next(err); // Handle error in hashing process
  }
});

// Method to compare input password with the hashed password stored in the database
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error('Password comparison failed'); // Error handling
  }
};

// Export the User model
module.exports = mongoose.model('User', UserSchema);
