// backend/routes/forms.js
const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');
const auth = require('../middleware/auth');
const HIPAAForm = require('../models/HIPAA');

// Submit Medical History Form
router.post('/medical-history', auth, async (req, res) => {
    try {
        const medicalHistory = new MedicalHistory({
            patientId: req.user.id,
            personalInfo: req.body.personalInfo,
            healthInfo: req.body.healthInfo,
            history: req.body.history
        });
        await medicalHistory.save();
        res.status(201).json({ message: 'Medical History Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit form' });
    }
});

// Get Medical History Form for Therapist
router.get('/medical-history/:patientId', auth, async (req, res) => {
    try {
        const medicalHistory = await MedicalHistory.findOne({ patientId: req.params.patientId });
        if (!medicalHistory) return res.status(404).json({ message: 'Medical History not found' });
        res.status(200).json(medicalHistory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve form' });
    }
});

// Submit HIPAA Form
router.post('/hipaa', auth, async (req, res) => {
    try {
        const hipaaForm = new HIPAAForm({
            patientId: req.user.id,
            signedPrivacyPolicy: req.body.signedPrivacyPolicy,
            consentForBilling: req.body.consentForBilling,
            consentForReleaseOfInfo: req.body.consentForReleaseOfInfo,
            photoVideoRelease: req.body.photoVideoRelease
        });
        await hipaaForm.save();
        res.status(201).json({ message: 'HIPAA Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit form' });
    }
});

module.exports = router;
