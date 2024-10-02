const mongoose = require('mongoose');
const MedicalHistorySchema = require('./MedicalHistory');

// Updated Patient Schema
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  contact: { type: String  },
  email: { type: String, required: true },
  address: { type: String }, // Added address for the patient
  occupation: { type: String },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
  medicalHistory: MedicalHistorySchema, // Link to the detailed Medical History schema
  progressLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
