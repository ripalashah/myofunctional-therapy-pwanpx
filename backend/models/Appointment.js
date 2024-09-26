// backend/models/Appointment.js
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Alternatively, use Date if you need precise time handling
    required: true,
  },
  status: {
    type: String,
    enum: ['booked', 'canceled', 'completed'],
    default: 'booked',
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'pending', 'refunded'],
    default: 'pending',
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema);
