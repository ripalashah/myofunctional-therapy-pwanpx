// backend/models/ProgressLog.js
const mongoose = require('mongoose');

const ProgressLogSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercisePlanId: { type: mongoose.Schema.Types.ObjectId, ref: 'ExercisePlan', required: true },
    exercises: [{
        exerciseTitle: { type: String, required: true },
        status: { type: String, enum: ['completed', 'skipped', 'incomplete'], required: true },
        completionDate: { type: Date, default: Date.now }
    }],
    sessionNotes: { type: String },  // Notes from the therapist
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProgressLog', ProgressLogSchema);
