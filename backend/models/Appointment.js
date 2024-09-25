const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
    notes: { type: String },
}, {
    timestamps: true,
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
