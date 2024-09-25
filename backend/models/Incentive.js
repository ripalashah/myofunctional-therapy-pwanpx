// backend/models/Incentive.js
const mongoose = require('mongoose');

const IncentiveSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    milestone: { type: String, required: true },  // E.g., "Completed 7 days of exercises"
    reward: { type: String, required: true },  // E.g., "10% off next session"
    completedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Incentive', IncentiveSchema);
