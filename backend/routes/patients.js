const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to authenticate users
const multer = require('multer'); // Import multer for file handling
const Patient = require('../models/Patient');
const User = require('../models/User'); // Ensure the User model is imported
const HIPAAForm = require('../models/HIPAA'); // Import the HIPAAForm model

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be stored in the 'uploads' directory

// Route to create a new patient
router.post('/create-patient', auth, upload.array('files'), async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Uploaded files:", req.files); // Log the uploaded files

  try {
    const patientData = JSON.parse(req.body.patientData);
    const { personalInfo } = patientData; 
    const { name, email } = personalInfo;

    // Ensure name and email exist
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }

    // Check if a user with this email already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user for the patient
    const newUser = new User({
      name,
      email,
      password: 'defaultPassword123', 
      role: 'patient',
    });
    await newUser.save();

    // Create a new patient with the detailed medical history
    const newPatient = new Patient({
      ...personalInfo, 
      medicalHistory: patientData.medicalHistory,
      therapistId: req.user.id, 
      userId: newUser._id, 
    });

    await newPatient.save();
     // Now also submit the HIPAA form during patient creation
     const hipaaForm = new HIPAAForm({
      patientId: newPatient._id,
      signedPrivacyPolicy: req.body.signedPrivacyPolicy,
      consentForBilling: req.body.consentForBilling,
      consentForReleaseOfInfo: req.body.consentForReleaseOfInfo,
      photoVideoRelease: req.body.photoVideoRelease
    });
    res.status(201).json(newPatient); 
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Failed to create patient' });
  }
});

// Route to fetch a patient's full history, including session notes, appointments, and forms
router.get('/:id/history', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('appointments')
      .populate('progressLogs')
      .populate('forms')
      .populate('hipaaForm');  // Add HIPAA form data here
      
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient history:', error);
    res.status(500).json({ error: 'Failed to fetch patient history' });
  }
});

// Route to update medical history for an existing patient
router.put('/:id/update-medical-history', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const updatedMedicalHistory = req.body.medicalHistory;

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
    const therapistId = req.user.id; 

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
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    res.status(500).json({ error: 'Failed to fetch patient profile' });
  }
});

// Add session notes to a patient profile
router.post('/:id/session-note', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const { note } = req.body;
    patient.progressLogs.push({ note, date: new Date() });
    await patient.save();

    res.status(200).json({ message: 'Session note added successfully' });
  } catch (error) {
    console.error('Error adding session note:', error);
    res.status(500).json({ error: 'Failed to log session note' });
  }
});

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
