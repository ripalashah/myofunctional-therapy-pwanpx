const mongoose = require('mongoose');

const ExercisePlanSchema = new mongoose.Schema({
    therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercises: [{
        title: { type: String, required: true },
        description: { type: String, required: true },
        mediaUrl: { type: String },
        frequency: { type: String, required: true },
        duration: { type: Number, required: true, min: 1 }
    }]
}, {
    timestamps: true,
});

module.exports = mongoose.model('ExercisePlan', ExercisePlanSchema);
