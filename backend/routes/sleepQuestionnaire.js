const express = require('express');
const router = express.Router();
const SleepQuestionnaire = require('../models/SleepQuestionnaire');
const auth = require('../middleware/auth'); // Assuming you have an authentication middleware

// Create or submit a sleep questionnaire (POST)
router.post('/submit', auth, async (req, res) => {
    try {
        const { doesSnore, hasTroubleSleeping, excessiveDaytimeSleepiness, sleepApneaRisk } = req.body;

        // Create a new sleep questionnaire
        const newQuestionnaire = new SleepQuestionnaire({
            patientId: req.user.id,
            questions: { doesSnore, hasTroubleSleeping, excessiveDaytimeSleepiness, sleepApneaRisk },
        });

        await newQuestionnaire.save();
        res.status(201).json({ message: 'Sleep questionnaire submitted successfully', newQuestionnaire });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit sleep questionnaire' });
    }
});

// Get a sleep questionnaire for a specific patient (GET)
router.get('/:patientId', auth, async (req, res) => {
    try {
        const questionnaire = await SleepQuestionnaire.findOne({ patientId: req.params.patientId });
        if (!questionnaire) return res.status(404).json({ message: 'Sleep questionnaire not found' });
        res.status(200).json(questionnaire);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sleep questionnaire' });
    }
});

module.exports = router;
