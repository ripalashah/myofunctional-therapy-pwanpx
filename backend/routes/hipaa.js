// backend/routes/hipaa.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');  // Middleware for authentication
const HIPAAForm = require('../models/HIPAA');  // Import the HIPAAForm model

// Submit HIPAA Form
router.post('/submit', auth, async (req, res) => {
    try {
        // Create a new HIPAA form based on the request body
        const newHIPAAForm = new HIPAAForm({
            patientId: req.user.id,  // Get the patient's ID from the logged-in user
            signedPrivacyPolicy: req.body.signedPrivacyPolicy,
            consentForBilling: req.body.consentForBilling,
            consentForReleaseOfInfo: req.body.consentForReleaseOfInfo,
            photoVideoRelease: req.body.photoVideoRelease || false,  // Optional
        });

        // Save the form to the database
        await newHIPAAForm.save();

        // Respond with success
        res.status(201).json({ message: 'HIPAA Form submitted successfully', hipaaForm: newHIPAAForm });
    } catch (error) {
        console.error('Error submitting HIPAA Form:', error);
        res.status(500).json({ error: 'Failed to submit HIPAA Form' });
    }
});

// Retrieve HIPAA Form by Patient ID
router.get('/:patientId', auth, async (req, res) => {
    try {
        // Find the HIPAA form by patientId
        const hipaaForm = await HIPAAForm.findOne({ patientId: req.params.patientId });

        // Check if the form exists
        if (!hipaaForm) {
            return res.status(404).json({ message: 'HIPAA Form not found for this patient' });
        }

        // Respond with the form data
        res.status(200).json(hipaaForm);
    } catch (error) {
        console.error('Error retrieving HIPAA Form:', error);
        res.status(500).json({ error: 'Failed to retrieve HIPAA Form' });
    }
});

module.exports = router;
