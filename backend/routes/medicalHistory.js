// backend/routes/medicalHistory.js
const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');

// Route to create a new medical history record
router.post('/create', auth, async (req, res) => {
    try {
        const { patientId, medicalHistoryData } = req.body;

        // Create a new MedicalHistory document
        const newMedicalHistory = new MedicalHistory(medicalHistoryData);
        const savedMedicalHistory = await newMedicalHistory.save();

        // Find the patient and update the reference to medicalHistory
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });

        patient.medicalHistory = savedMedicalHistory._id;
        await patient.save();

        res.status(201).json({ message: 'Medical history added successfully', patient });
    } catch (error) {
        console.error('Error creating medical history:', error);
        res.status(500).json({ error: 'Failed to create medical history' });
    }
});

// Route to update a patient's medical history
router.put('/update/:patientId', auth, async (req, res) => {
    try {
        const { patientId } = req.params;
        const updatedMedicalHistoryData = req.body.medicalHistory;

        // Find the patient by ID
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ error: 'Patient not found' });

        // Find the medical history and update it
        if (patient.medicalHistory) {
            const medicalHistory = await MedicalHistory.findByIdAndUpdate(
                patient.medicalHistory,
                updatedMedicalHistoryData,
                { new: true }
            );

            res.status(200).json({ message: 'Medical history updated successfully', medicalHistory });
        } else {
            res.status(404).json({ message: 'Medical history not found for this patient' });
        }
    } catch (error) {
        console.error('Error updating medical history:', error);
        res.status(500).json({ error: 'Failed to update medical history' });
    }
});

// Route to get a patient's medical history by patient ID
router.get('/:patientId', auth, async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patientId).populate('medicalHistory');

        if (!patient || !patient.medicalHistory) {
            return res.status(404).json({ message: 'Medical history not found for this patient' });
        }

        res.status(200).json(patient.medicalHistory);
    } catch (error) {
        console.error('Error retrieving medical history:', error);
        res.status(500).json({ error: 'Failed to retrieve medical history' });
    }
});

module.exports = router;
