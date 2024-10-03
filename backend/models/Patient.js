const mongoose = require('mongoose');
const MedicalHistorySchema = require('./MedicalHistory'); // Import the MedicalHistorySchema
const Form = require('./Form'); // Ensure Form model is imported

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  occupation: { type: String },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
  medicalHistory: MedicalHistorySchema,  // Reference the MedicalHistorySchema
  hipaaForm: { type: mongoose.Schema.Types.ObjectId, ref: 'HIPAA' },
  progressLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;
