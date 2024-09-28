// backend/routes/progress.js
const express = require('express');
const router = express.Router();
const ProgressLog = require('../models/ProgressLog');
const Incentive = require('../models/Incentive');
const auth = require('../middleware/auth');

// Log Progress (Patient)
router.post('/log-progress', auth, async (req, res) => {
    try {
        const { exercisePlanId, exercises, sessionNotes, therapistId } = req.body;
        const progressLog = new ProgressLog({
            patientId: req.user.id,
            therapistId,
            exercisePlanId,
            exercises,
            sessionNotes,
        });
        await progressLog.save();
        
        await checkAndRewardIncentives(req.user.id); // Check for incentives after logging progress

        res.status(201).json({ message: 'Progress logged and incentives checked' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log progress' });
    }
});

// Get Progress Log for Therapist
router.get('/progress-logs/:patientId', auth, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const filter = {
            patientId: req.params.patientId,
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        };

        const progressLogs = await ProgressLog.find(filter).populate('exercisePlanId').populate('therapistId');
        res.status(200).json(progressLogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch progress logs' });
    }
});

module.exports = router;
