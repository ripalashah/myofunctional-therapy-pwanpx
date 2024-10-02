const mongoose = require('mongoose');
const MedicalHistorySchema = require('./MedicalHistory');
const Form = require('./Form');  // Ensure this line is added

// Updated Patient Schema
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  contact: { type: String },
  email: { type: String, required: true },
  address: { type: String },
  occupation: { type: String },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],  // Reference the Form model
  medicalHistory: MedicalHistorySchema,
  progressLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hipaaForm: { type: mongoose.Schema.Types.ObjectId, ref: 'HIPAAForm' }, // Add the reference to HIPAA form
  createdAt: { type: Date, default: Date.now }
});

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
