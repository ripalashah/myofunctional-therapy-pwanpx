const mongoose = require('mongoose');
const MedicalHistorySchema = require('./MedicalHistory');

// Updated Patient Schema
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  contact: { type: String },
  email: { type: String },
  address: { type: String }, // Added address for the patient
  occupation: { type: String },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
  medicalHistory: MedicalHistorySchema, // Link to the detailed Medical History schema
  progressLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', PatientSchema);
