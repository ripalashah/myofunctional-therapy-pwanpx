const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String },
  occupation: { type: String },
  medicalHistory: { type: mongoose.Schema.Types.ObjectId, ref: 'MedicalHistory' }, 
  hipaaForm: { type: mongoose.Schema.Types.ObjectId, ref: 'HIPAA' },
  progressLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', PatientSchema);
