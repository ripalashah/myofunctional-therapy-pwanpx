// backend/routes/forms.js
const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');
const auth = require('../middleware/auth');

// Submit Medical History Form
router.post('/medical-history', auth, async (req, res) => {
    try {
        const { patientId, ...medicalHistoryData } = req.body;
        
        if (!patientId) {
            return res.status(400).json({ error: 'Patient ID is required' });
        }

        const medicalHistory = new MedicalHistory({
            patientId,
            ...medicalHistoryData
        });

         // Save medical history to the database
         const savedHistory = await medicalHistory.save();
        // Update the patient's record to reference this medical history
        await Patient.findByIdAndUpdate(patientId, { medicalHistory: savedHistory._id });
        res.status(201).json({ message: 'Medical History Form submitted successfully', medicalHistory: savedHistory });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit Medical History Form' });
    }
});

// Get Medical History Form by Patient ID
router.get('/medical-history/:patientId', auth, async (req, res) => {
    try {
        const medicalHistory = await MedicalHistory.findOne({ patientId: req.params.patientId });

        if (!medicalHistory) {
            return res.status(404).json({ message: 'Medical History not found' });
        }

        res.status(200).json(medicalHistory);
    } catch (error) {
        console.error('Error retrieving medical history:', error);
        res.status(500).json({ error: 'Failed to retrieve Medical History Form' });
    }
});

// New endpoint for patient medical history submission
router.post('/patient-medical-history', auth, async (req, res) => {
    try {
      const { patientId, medicalHistoryData } = req.body;
      const newMedicalHistory = new MedicalHistory({ patientId, ...medicalHistoryData });
      const savedHistory = await newMedicalHistory.save();
      // Update the patient's record to reference this medical history
      await Patient.findByIdAndUpdate(patientId, { medicalHistory: savedHistory._id });
      res.status(201).json({ message: 'Medical History Form submitted successfully', medicalHistory: savedHistory });
    } catch (error) {
      res.status(500).json({ error: 'Failed to submit Medical History Form' });
    }
  });

module.exports = router;
