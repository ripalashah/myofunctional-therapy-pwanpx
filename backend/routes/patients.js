const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to authenticate users
const Patient = require('../models/Patient');
const User = require('../models/User'); // Ensure the User model is imported

// Route to create a new patient
router.post('/create-patient', auth, async (req, res) => {
  try {
    const therapistId = req.user.id; // Therapist ID from the authenticated user
    let user = await User.findOne({ email: req.body.email });
    // Create a new patient based on data passed in the request body
    const newUser = new User({
      email: req.body.email,
      password: 'defaultPassword123', // You may want to generate or request a password securely
      role: 'patient', // Set the role to 'patient'
    });

    await newUser.save();

    // Then, create the patient linked to this user
    const newPatient = new Patient({
      name: req.body.name,
      age: req.body.age,
      contact: req.body.contact,
      email: req.body.email,
      medicalHistory: req.body.medicalHistory,
      userId: newUser._id, // Link the patient to the newly created user
    });

    await newPatient.save();
    res.status(201).json(newPatient); // Return the created patient data
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

module.exports = router;

// Route to get all patients for a logged-in therapist
router.get('/therapist-patients', auth, async (req, res) => {
  try {
    const therapistId = req.user.id; // Get the therapist's ID from the authenticated user

    // Find all patients associated with the therapist and populate the userId field to get linked user's email and role
    const patients = await Patient.find({ therapistId }).populate('userId', 'email role');

    if (!patients || patients.length === 0) {
      return res.status(404).json({ message: 'No patients found' });
    }

    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Failed to fetch patients' });
  }
});


// Route to get a detailed patient profile
router.get('/:id', auth, async (req, res) => {
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
router.post('/:id/session-note', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const { note } = req.body;
    patient.progressLogs.push({ note, date: new Date() }); // Add a note with the current date
    await patient.save();

    res.status(200).json({ message: 'Session note added successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to log session note' });
  }
});

module.exports = router;
