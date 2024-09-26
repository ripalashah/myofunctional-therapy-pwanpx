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
// backend/routes/progress.js
router.get('/progress-logs/:patientId', auth, async (req, res) => {
    try {
      const { startDate, endDate } = req.query; // Get date range from query parameters
      const filter = {
        patientId: req.params.patientId,
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }, // Filter by date range
      };
  
      const progressLogs = await ProgressLog.find(filter);
      res.status(200).json(progressLogs);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch progress logs' });
    }
  });
  

// Check and Reward Incentives Function
const checkAndRewardIncentives = async (patientId) => {
    const progressLogs = await ProgressLog.find({ patientId });

    // Reward for completing exercises for 7 days in a row
    const has7DayStreak = progressLogs.length >= 7 && progressLogs.slice(-7).every(log => log.exercises.every(ex => ex.status === 'completed'));

    if (has7DayStreak) {
        const reward = new Incentive({
            patientId,
            milestone: "Completed 7 days of exercises",
            reward: "10% off next session"
        });
        await reward.save();
    }
};

// Get Progress Data for a Patient within a Time Range
router.get('/progress-logs/:patientId', auth, async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
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
