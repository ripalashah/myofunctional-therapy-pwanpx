// backend/routes/patients.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Assuming you have auth middleware
const Patient = require('../models/Patient');

// Define the route to get patients for a logged-in therapist
router.get('/therapist-patients', auth, async (req, res) => {
  try {
    const therapistId = req.user.id; // Assuming req.user.id contains the therapist's ID from auth middleware
    const patients = await Patient.find({ therapistId });
    if (!patients) {
      return res.status(404).json({ message: 'No patients found' });
    }
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Get all patients linked to the therapist
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find(); // Add filtering if necessary
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});

// Get detailed patient profile
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('forms')
      .populate('progressLogs')
      .populate('appointments');
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch patient profile' });
  }
});

// Add session notes to a patient profile
router.post('/:id/session-note', async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) return res.status(404).json({ error: 'Patient not found' });
  
      const { note } = req.body;
      patient.progressLogs.push({ note, date: new Date() }); // Assumes you have a progress log mechanism
      await patient.save();
      res.status(200).json({ message: 'Session note added successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to log session note' });
    }
  });
  

module.exports = router;
