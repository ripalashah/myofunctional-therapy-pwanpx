const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Middleware to authenticate users
const multer = require('multer'); // Import multer for file handling
const Patient = require('../models/Patient');
const MedicalHistory = require('../models/MedicalHistory');
const User = require('../models/User'); // Ensure the User model is imported
const HIPAA = require('../models/HIPAA'); // Import the HIPAAForm model
const mongoose = require('mongoose');

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be stored in the 'uploads' directory

// Route to create a new patient
router.post('/create-patient', auth, upload.array('files'), async (req, res) => {
  try {
    const patientData = JSON.parse(req.body.patientData);
    const {
      personalInfo,
      medicalProblems,
      childhoodIllnesses,
      immunizationDates,
      surgeries,
      allergies,
      intolerances,
      prenatalHistory,
      developmentalHistory,
      interventions,
      speech,
      sensorySystem,
      sleepingPattern,
      feedingHistory,
      oralHabits,
      dentalHistory,
      hipaaConsent,
    } = patientData;

    console.log('Received patient data:', patientData);
    console.log('Medical history data received:', medicalProblems);

    // Ensure required fields are present
    if (!personalInfo || !personalInfo.name || !personalInfo.email || !personalInfo.dob) {
      return res.status(400).json({
        error: 'Personal information is incomplete. Name, email, and date of birth are required.',
      });
    }

    // Check if a user with this email already exists
    let user = await User.findOne({ email: personalInfo.email });
    if (!user) {
      user = new User({
        name: personalInfo.name,
        email: personalInfo.email,
        password: 'defaultPassword123', // Placeholder password
        role: 'patient',
      });
      await user.save();
    }

    // Create a new patient entry
    const newPatient = new Patient({
      name: personalInfo.name,
      email: personalInfo.email,
      address: personalInfo.address,
      occupation: personalInfo.occupation,
      therapistId: req.user.id,
    });

    await newPatient.save();

    // Validate and set default values for enum fields
    const validQualityOfFeeding = ['excellent', 'average', 'difficult', 'limited', 'requireSupplement'];
    const validCurrentDietQuality = ['good', 'average', 'limited', 'picky', 'restricted'];
    const validResponseOptions = ['WNL', 'Late Introduction', 'struggle', 'aversive'];

    // Set defaults if values are empty
    feedingHistory.qualityOfFeeding = validQualityOfFeeding.includes(feedingHistory.qualityOfFeeding)
      ? feedingHistory.qualityOfFeeding
      : 'average';

    feedingHistory.currentDietQuality = validCurrentDietQuality.includes(feedingHistory.currentDietQuality)
      ? feedingHistory.currentDietQuality
      : 'good';

    // Validate solidFoodIntroduction responses
    feedingHistory.solidFoodIntroduction = feedingHistory.solidFoodIntroduction.map((food) => ({
      ...food,
      response: validResponseOptions.includes(food.response) ? food.response : 'WNL',
    }));

    // Create MedicalHistory
    const medicalHistory = new MedicalHistory({
      patientId: newPatient._id,
      personalInfo,
      medicalProblems,
      childhoodIllnesses,
      immunizationDates,
      surgeries,
      allergies,
      intolerances,
      prenatalHistory,
      developmentalHistory,
      interventions,
      speech,
      sensorySystem,
      sleepingPattern,
      feedingHistory,
      oralHabits,
      dentalHistory,
    });

    await medicalHistory.save();
    console.log('Medical history saved:', medicalHistory);

    // Link the medical history to the patient
    newPatient.medicalHistory = medicalHistory._id;
    await newPatient.save();

    // Handle HIPAA consent
    if (hipaaConsent) {
      const hipaaForm = new HIPAA({
        patientId: newPatient._id,
        ...hipaaConsent,
      });
      await hipaaForm.save();

      newPatient.hipaaForm = hipaaForm._id;
      await newPatient.save();
    }

    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ error: 'Failed to create patient' });
  }
});


// DELETE a patient by ID and associated user
router.delete('/:id', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // First, delete the associated user
    await User.findByIdAndDelete(patient.userId);

    // Then, delete the patient
    await Patient.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Patient and associated user deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient and user:', error);
    res.status(500).json({ message: 'Failed to delete patient and associated user' });
  }
});


// Route to fetch a patient's full history, including medical history
router.get('/:id/history', auth, async (req, res) => {
  const { id } = req.params;

  // Check if the provided ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid patient ID format' });
  }

  try {
    const patient = await Patient.findById(id)
      .populate('medicalHistory')
      .populate('therapistId', 'name email')
      .populate('appointments')
      .populate('progressLogs')
      .populate('hipaaForm');

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error('Error fetching patient history:', error);
    res.status(500).json({ error: 'Failed to fetch patient history' });
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
