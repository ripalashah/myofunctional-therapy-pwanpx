// backend/models/SleepQuestionnaire.js
const mongoose = require('mongoose');

const SleepQuestionnaireSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questions: {
        doesSnore: { type: Boolean },
        hasTroubleSleeping: { type: Boolean },
        excessiveDaytimeSleepiness: { type: Boolean },
        sleepApneaRisk: { type: Boolean }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SleepQuestionnaire', SleepQuestionnaireSchema);
