// backend/routes/incentives.js
const express = require('express');
const router = express.Router();
const Incentive = require('../models/Incentive');
const auth = require('../middleware/auth');

// Get all incentives for a patient
router.get('/patient-incentives', auth, async (req, res) => {
    try {
        const incentives = await Incentive.find({ patientId: req.user.id });
        res.status(200).json(incentives);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve incentives' });
    }
});

module.exports = router;
