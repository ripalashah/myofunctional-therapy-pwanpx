const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  contact: { type: String },
  email: { type: String },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
  medicalHistory: { type: String }, // Or link to a detailed medical history model
  progressLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true }, // Reference to therapist
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the linked user
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', PatientSchema);
