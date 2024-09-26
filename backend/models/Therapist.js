// models/Therapist.js
const mongoose = require('mongoose');

const TherapistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  specialty: { type: String },
  availability: [{ day: String, startTime: String, endTime: String }], // Example of availability data
  // Other therapist-specific fields
});

module.exports = mongoose.model('Therapist', TherapistSchema);
