// backend/routes/progress.js
const express = require('express');
const router = express.Router();
const ProgressLog = require('../models/ProgressLog');
const auth = require('../middleware/auth');
// backend/routes/progress.js (add incentive tracking logic)
const Incentive = require('../models/Incentive');
// backend/routes/progress.js (existing progress endpoint with date range filtering)
const express = require('express');
const ProgressLog = require('../models/ProgressLog');
const auth = require('../middleware/auth');

// Log Progress (Patient)
router.post('/log-progress', auth, async (req, res) => {
    try {
        const { exercisePlanId, exercises, sessionNotes } = req.body;
        const progressLog = new ProgressLog({
            patientId: req.user.id,
            therapistId: req.body.therapistId,
            exercisePlanId,
            exercises,
            sessionNotes
        });
        await progressLog.save();
        res.status(201).json({ message: 'Progress logged successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to log progress' });
    }
});

// Get Progress Log for Therapist
router.get('/progress-log/:patientId', auth, async (req, res) => {
    try {
        const progressLogs = await ProgressLog.find({ patientId: req.params.patientId });
        if (!progressLogs) return res.status(404).json({ message: 'Progress log not found' });
        res.status(200).json(progressLogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve progress log' });
    }
});

const checkAndRewardIncentives = async (patientId) => {
    const progressLogs = await ProgressLog.find({ patientId });

    // Example: Reward for completing exercises for 7 days in a row
    const has7DayStreak = progressLogs.length >= 7 && progressLogs.slice(-7).every(log => log.status === 'completed');

    if (has7DayStreak) {
        const reward = new Incentive({
            patientId,
            milestone: "Completed 7 days of exercises",
            reward: "10% off next session"
        });
        await reward.save();
    }
};

// Add this logic after logging patient progress
router.post('/log-progress', auth, async (req, res) => {
    // ...existing logic to log progress

    await checkAndRewardIncentives(req.user.id);  // Check for incentives after logging progress
    res.status(201).json({ message: 'Progress logged and incentives checked' });
});

// Get progress data for a patient within a specified time range
router.get('/progress-logs/:patientId', auth, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;  // Optional date range filter
        const filter = {
            patientId: req.params.patientId,
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
        };

        const progressLogs = await ProgressLog.find(filter);
        res.status(200).json(progressLogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch progress logs' });
    }
});

module.exports = router;
