// backend/models/MedicalHistory.js
const mongoose = require('mongoose');

const MedicalHistorySchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    personalInfo: {
        patientName: { type: String, required: true },
        dob: { type: Date, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true }
    },
    healthInfo: {
        physicianName: { type: String, required: true },
        lastPhysicalExam: { type: Date, required: true },
        chiefComplaint: { type: String, required: true }
    },
    history: {
        prematureBirth: { type: Boolean },
        prenatalHistory: { type: String },
        developmentalHistory: { type: String },
        feedingHistory: { type: String }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);
