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
    if (user) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user for the patient
    const newUser = new User({
      email: req.body.email,
      password: 'defaultPassword123', // You may want to generate or request a password securely
      role: 'patient', // Set the role to 'patient'
    });
    await newUser.save();

    // Destructure medicalHistory from request body to handle each part separately
    const {
      name,
      age,
      contact,
      email,
      medicalHistory: {
        childhoodIllnesses,
        immunizationDates,
        medicalProblems,
        surgeries,
        allergies,
        medications,
        developmentalHistory,
        prenatalHistory,
        feedingHistory,
        oralHabits,
        dentalHistory,
        sleepPattern,
        foodIntolerances,
        otherDetails
      }
    } = req.body;

    // Create a new patient with the detailed medical history
    const newPatient = new Patient({
      name,
      age,
      contact,
      email,
      medicalHistory: {
        childhoodIllnesses,
        immunizationDates,
        medicalProblems,
        surgeries, // Array of surgery objects
        allergies, // Array of allergy objects
        medications, // Array of medication objects
        developmentalHistory, // Array of developmental milestones
        prenatalHistory, // Prenatal history object
        feedingHistory, // Feeding history object
        oralHabits, // Oral habits object
        dentalHistory, // Dental history object
        sleepPattern, // Sleep pattern object
        foodIntolerances, // Array of food intolerances
        otherDetails // Any other details
      },
      therapistId, // Linked therapist ID
      userId: newUser._id, // Link to the newly created user
    });

    await newPatient.save();
    res.status(201).json(newPatient); // Return the created patient data
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

// Route to update medical history for an existing patient
router.put('/:id/update-medical-history', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const updatedMedicalHistory = req.body.medicalHistory;

    // Update the medical history fields
    patient.medicalHistory = updatedMedicalHistory;

    await patient.save();
    res.status(200).json({ message: 'Medical history updated successfully', patient });
  } catch (error) {
    console.error('Error updating medical history:', error);
    res.status(500).json({ error: 'Failed to update medical history' });
  }
});


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
