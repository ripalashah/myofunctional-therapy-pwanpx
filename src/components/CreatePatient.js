import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, Stepper, Step, StepLabel, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, Input, FormControlLabel, Checkbox } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import DatePicker from MUI X
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Localization for DatePicker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Adapter for date-fns
import ChildhoodIllnessesStep from './ChildhoodIllnessesStep';
import MedicalProblemsStep from './MedicalProblemsStep';
import SurgeriesStep from './SurgeriesStep';
import DrugsOTCStep from './DrugsOTCStep';
import PrenatalHistoryStep from './PrenatalHistoryStep';
import DevelopmentHistoryStep from './DevelopmentHistoryStep';
import InterventionsStep from './InterventionsStep';
import SpeechStep from './SpeechStep';
import SensorySystemStep from './SensorySystemStep';
import SleepingPatternStep from './SleepingPatternStep';
import FeedingHistoryStep from './FeedingHistoryStep';
import OralHabitsStep from './OralHabitsStep';
import DentalHistoryStep from './DentalHistoryStep';
import ImmunizationDatesStep from './ImmunizationDatesStep';

const CreatePatient = ({ onPatientCreated }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      dob: null, // Date as null initially
      maritalStatus: '',
      gender: '',
      address: '',
      parentName: '',
      occupation: '',
      phone: '',
      email: '',
      physician: '',
      lastPhysicalExam: null, // Date as null initially
      chiefComplaint: ''
    } ,
    childhoodIllnesses: { measles: false, mumps: false, rubella: false, chickenpox: false,  rheumaticFever: false, polio: false, other: '' },

    immunizationDates: {
      tetanus: null,
      pneumonia: null,
      hepatitis: null,
      influenza: null,
      chickenpox: null,
      mmr: null
    },
    
    medicalProblems: {
      prematureBirth: false,
      feedingDisorder: false,
      seizures: false,
      eatingAppetiteProblems: false,
      otitisMedia: false,
      nasalObstruction: false,
      enlargedTonsils: false,
      earProblems: false,
      sinusInfection: false,
      snoring: false,
      reflux: false,
      deviatedSeptum: false,
      troubleSleeping: false,
      headachesMigraines: false,
      neckShoulderPain: false,
      geneticDisorder: false,
      bloodDiseases: false,
      pneumonia: false,
      asthma: false,
      heartMurmur: false,
      otherHeartCondition: false,
      chestPain: false,
      bloodPressure: false,
      kidneyProblems: false,
      lungProblems: false,
      thyroidProblems: false,
      liverProblems: false,
      diabetes: false,
      panicWhenStressed: false,
      addAdhd: false,
      depression: false,
      anxiety: false,
      mouthBreathing: false,
      celiacDisease: false
    },
    surgeries: [], // Initial empty surgery
    hospitalizationYear: '',
    hospitalizationReason: '',
    hospitalizationHospital: '',
    bloodTransfusion: '',
    bloodTransfusionExplanation: '',
    
    drugs: [],
    allergies: { drugName: '', reaction: '', pollen: false, dust: false, trees: false, redDye: false, grass: false, latex: false, beeStings: false, food: false, other: '' },
    intolerances: { gluten: false, dairy: false, redDye: false, shellfish: false, nuts: false, eggs: false, others: '' },
    prenatalHistory: {
      history: '', // Normal, Atypical, Complications
      complications: '', // Description of complications
      term: '', // 40+ weeks, 39-37 weeks, 36-33 weeks, Other
      laborDelivery: '', // Normal, Induced, C-Section
      complicationsDetails: {
        protractedLabor: false,
        forceps: false,
        vacuum: false
      },
      csectionComplications: '' // Description of C-section complications
    },
    developmentalHistory: {
      heldHeadUp: 'onTime', // Options: 'onTime', 'delayed'
      rolledOver: 'onTime',
      walking: 'onTime',
      running: 'onTime',
      coloring: 'onTime',
      writing: 'onTime' // You can add more fields if necessary
    },
    interventions: {
      speechTherapy: { name: '', contactInfo: '', reason: '' },
      occupationalTherapy: { name: '', contactInfo: '', reason: '' },
      physicalTherapy: { name: '', contactInfo: '', reason: '' },
      abaTherapy: { name: '', contactInfo: '', reason: '' },
      otherTherapy: { name: '', contactInfo: '', reason: '' },
    },
    speech: {
      frustration: false,
      lisp: false,
      speakingFast: false,
      stuttering: false,
      soundIssues: false,
      soundDetails: '',
      mumbling: false,
    },
    sensorySystem: {
      light: false,
      sound: false,
      texture: false,
      selfRegulation: false,
      hypersensitive: false,
      other: '',
    },
    sleepingPattern: {
      goodSleeper: false,
      childSleepConcerns: false,
      childSleepExplanation: '', // For further explanation if any concerns
    },
    feedingHistory: {
      infantHistory: {
        breastfed: false,
        bottleFedBreastmilk: false,
        bottleFed: false,
        nasogastricTube: false,
      },
      feedingCharacterizedBy: {
        difficultyLatch: false,
        reflux: false,
        gastricDiscomfort: false,
        phasicBiteReflex: false,
        poorSuckSkill: false,
        poorMilkSupply: false,
        neededNippleShield: false,
        labialTie: false,
        tongueTie: false,
        mastitisInfections: false,
        poorRootingReflex: false,
      },
      infantChildrenAdult: {
        frustration: false,
        packingFood: false,
        difficultyTransitioning: false,
        chokingGagging: false,
        pickyEater: false,
        anyTexture: false,
        grazeFood: false,
        wontTryNewFood: false,
      },
      qualityOfFeeding: '',
      solidFoodIntroduction: [
        { product: 'Rice Cereal', month: '', response: '' },
        { product: 'Pureed', month: '', response: '' },
        { product: 'Level 3 (Lumpy Puree)', month: '', response: '' },
        { product: 'Finger Foods', month: '', response: '' },
        { product: 'Soft Mechanical Diet', month: '', response: '' },
        { product: 'Full Mechanical Diet', month: '', response: '' },
      ],
      currentDietQuality: '',
      canSwallowPills: false,
      requiresFluids: false,
    },
    oralHabits: {
      pacifier: {
        duringDay: false,
        atNight: false,
        resolvedBy: ''
      },
      thumbDigit: {
        duringDay: false,
        atNight: false,
        resolvedBy: ''
      },
      objects: {
        duringDay: false,
        atNight: false,
        resolvedBy: ''
      }
    },
    dentalHistory: {
      dentistName: '',
      dentistAddress: '',
      orthodontistName: '',
      orthodontistAddress: '',
      lastVisitReason: '',
      lastVisitDate: '',
      brushingFrequency: '',
      dentalProblem: false,
      teethSensitivity: false,
      frequentColdSores: false,
      badOdorsTaste: false,
      gumBleeding: false,
      teethGrinding: false,
      biteProblems: false,
      jawProblems: false,
      frequentHeadaches: false,
      tmjTreatment: false,
      orthodonticTreatment: false,
      bitePlate: false,
      satisfiedWithSmile: false,
      smileChange: ''
    },
    hipaaConsent: {
      signedPrivacyPolicy: false,
      consentForBilling: false,
      consentForReleaseOfInfo: false,
      photoVideoRelease: false,
    } 
}); 

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeStep, setActiveStep] = useState(0); // Track the current step
  const [files, setFiles] = useState([]); // File upload state

  const steps = ['Personal Info', 'Childhood Illnesses', 'Immunization Dates', 'Medical Problems', 'Surgeries', 'Medications', 'Prenatal History', 'Development History', 'Interventions', 
  'Speech', 
  'Sensory System', 
  'Sleeping Pattern', 
  'Feeding History', 
  'Oral Habits', 'Dental History', 'Upload Medical Documents', 'HIPAA Consent'];

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nameParts = name.split('.'); // Splitting the name for nested structure
  
    setFormData((prevState) => {
      let updatedData = { ...prevState }; // Create a copy of the current state
      let nestedField = updatedData;
  
      // Traverse through the nested objects based on the split name
      nameParts.forEach((part, index) => {
        if (index === nameParts.length - 1) {
          // Last part of the name, assign the value
          if (type === 'checkbox') {
            nestedField[part] = checked; // For checkboxes
          } else {
            nestedField[part] = value; // For other input types
          }
        } else {
          // Keep drilling down the object structure
          nestedField = nestedField[part];
        }
      });
  
      return updatedData; // Return the updated state
    });
  };
  
    // Handle Date Changes for DatePickers
  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name.split('.')[0]]: {
        ...prevData[name.split('.')[0]],
        [name.split('.')[1]]: date,
      },
    }));
  };
  // Handle file uploads
  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  // Add or remove surgeries dynamically
  const addSurgery = () => {
    setFormData((prevData) => ({
      ...prevData,
      surgeries: Array.isArray(prevData.surgeries) 
      ? [...prevData.surgeries, { year: '', reason: '', hospital: '' }] 
      : [{ year: '', reason: '', hospital: '' }]
    }));
  };

  const handleSurgeryChange = (index, field, value) => {
    const updatedSurgeries = (formData.surgeries || []).map((surgery, i) =>
      i === index ? { ...surgery, [field]: value } : surgery
    );
    setFormData((prevData) => ({
      ...prevData,
      surgeries: updatedSurgeries
    }));
  };

  const removeSurgery = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      surgeries: prevData.surgeries.filter((_, i) => i !== index),
    }));
  };

  // Add a new drug entry
  const addDrug = () => {
    setFormData((prevData) => ({
      ...prevData,
      drugs: Array.isArray(prevData.drugs)
        ? [...prevData.drugs, { name: '', strength: '', frequency: '' }]
        : [{ name: '', strength: '', frequency: '' }],
    }));
  };

  // Handle drug value changes
  const handleDrugChange = (index, field, value) => {
    const updatedDrugs = (formData.drugs || []).map((drug, i) =>
      i === index ? { ...drug, [field]: value } : drug
    );
    setFormData((prevData) => ({
      ...prevData,
      drugs: updatedDrugs,
    }));
  };

  // Remove a drug from the list
  const removeDrug = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      drugs: prevData.drugs.filter((_, i) => i !== index),
    }));
  };
  
  /// Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submission triggered'); // Add this line
    setError('');
    setSuccess('');
  
    try {
      console.log('Full formData before submission:', formData);
      const formDataToSubmit = new FormData();
      console.log('Medical history data:', formData.medicalProblems); // Or the relevant field for medical history
      formDataToSubmit.append('name', formData.personalInfo.name);
      formDataToSubmit.append('email', formData.personalInfo.email);
      formDataToSubmit.append('patientData', JSON.stringify(formData));

      // Log the FormData content before sending
      console.log('FormData content before sending:', formDataToSubmit.get('patientData')); 

      files.forEach((file) => {
        formDataToSubmit.append('files', file);
      });
  
      console.log('Sending formData:', formDataToSubmit);
  
      const res = await axios.post('http://localhost:5000/api/patients/create-patient', formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setSuccess('Patient created successfully');
      onPatientCreated(res.data);
    } catch (error) {
      console.error('Error creating patient:', error);
      setError(`Failed to create patient: ${error.response?.data?.message || error.message}`);
    }
  };
  
  // Step Content Rendering Logic
  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              fullWidth
              name="personalInfo.name"
              label="Full Name"
              value={formData.personalInfo.name}
              onChange={onChange}
              required
              margin="dense"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={formData.personalInfo.dob}
                onChange={(date) => handleDateChange('personalInfo.dob', date)}
                renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
              />
            </LocalizationProvider>
            <FormControl fullWidth margin="dense">
              <InputLabel>Marital Status</InputLabel>
              <Select
                name="personalInfo.maritalStatus"
                value={formData.personalInfo.maritalStatus}
                onChange={onChange}
                label="Marital Status"
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Partnered">Partnered</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Separated">Separated</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
              </Select>
              <FormHelperText>Select marital status</FormHelperText>
            </FormControl>

            <FormControl fullWidth margin="dense">
              <InputLabel>Gender</InputLabel>
              <Select
                name="personalInfo.gender"
                value={formData.personalInfo.gender}
                onChange={onChange}
                label="Gender"
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
              <FormHelperText>Select gender</FormHelperText>
            </FormControl>

            <TextField
              fullWidth
              name="personalInfo.address"
              label="Address"
              value={formData.personalInfo.address}
              onChange={onChange}
              margin="dense"
            />

            <TextField
              fullWidth
              name="personalInfo.phone"
              label="Phone Number"
              value={formData.personalInfo.phone}
              onChange={onChange}
              margin="dense"
            />

            <TextField
              fullWidth
              name="personalInfo.email"
              label="Email Address"
              value={formData.personalInfo.email}
              onChange={onChange}
              margin="dense"
            />
            {/* Add the missing fields here */}
            <TextField
              fullWidth
              name="personalInfo.parentName"
              label="Parent Name (if applicable)"
              value={formData.personalInfo.parentName}
              onChange={onChange}
              margin="dense"
            />

            <TextField
              fullWidth
              name="personalInfo.occupation"
              label="Occupation"
              value={formData.personalInfo.occupation}
              onChange={onChange}
              margin="dense"
            />

            <TextField
              fullWidth
              name="personalInfo.physician"
              label="Physician"
              value={formData.personalInfo.physician}
              onChange={onChange}
              margin="dense"
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Last Physical Exam"
                value={formData.personalInfo.lastPhysicalExam}
                onChange={(date) => handleDateChange('personalInfo.lastPhysicalExam', date)}
                renderInput={(params) => <TextField fullWidth margin="dense" {...params} />}
              />
            </LocalizationProvider>

            <TextField
              fullWidth
              name="personalInfo.chiefComplaint"
              label="Chief Complaint"
              value={formData.personalInfo.chiefComplaint}
              onChange={onChange}
              margin="dense"
            />
          </>
        );
      case 1:
        return <ChildhoodIllnessesStep formData={formData} onChange={onChange} />;
        case 2:
        return <ImmunizationDatesStep formData={formData} handleDateChange={handleDateChange} />; // Immunization step
      case 3:
        return <MedicalProblemsStep formData={formData} onChange={onChange} />;
      case 4:
        return <SurgeriesStep formData={formData} onChange={onChange} addSurgery={addSurgery} removeSurgery={removeSurgery} handleSurgeryChange={handleSurgeryChange}/>;
      case 5:
        return <DrugsOTCStep formData={formData} onChange={onChange} addDrug={addDrug} removeDrug={removeDrug} handleDrugChange={handleDrugChange} />;
      case 6:
        return <PrenatalHistoryStep formData={formData} onChange={onChange} />;
      case 7:
        return <DevelopmentHistoryStep formData={formData} onChange={onChange} />;
      case 8:
        return <InterventionsStep formData={formData} onChange={onChange} />;
      case 9:
        return <SpeechStep formData={formData} onChange={onChange} />;
      case 10:
        return <SensorySystemStep formData={formData} onChange={onChange} setFormData={setFormData} />;
      case 11:
        return <SleepingPatternStep formData={formData} onChange={onChange} />;
      case 12:
        return <FeedingHistoryStep formData={formData} onChange={onChange} />;
      case 13:
        return <OralHabitsStep formData={formData} onChange={onChange} />;
      case 14:
        return <DentalHistoryStep formData={formData} onChange={onChange} />;
      case 15:
        return (
          <>
            <Typography variant="h6">Upload Medical Documents</Typography>
            <Input type="file" multiple onChange={handleFileUpload} /> {/* Use handleFileUpload */}
          </>
        );
        case 16: // HIPAA consent step
      return (
        <>
          <Typography variant="h6">HIPAA Consent</Typography>
          <FormControl component="fieldset">
            <FormControlLabel
              control={
                <Checkbox
                  name="hipaaConsent.signedPrivacyPolicy"
                  checked={formData.hipaaConsent.signedPrivacyPolicy}
                  onChange={onChange}
                />
              }
              label="I consent to the privacy policy"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hipaaConsent.consentForBilling"
                  checked={formData.hipaaConsent.consentForBilling}
                  onChange={onChange}
                />
              }
              label="I consent to billing policies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hipaaConsent.consentForReleaseOfInfo"
                  checked={formData.hipaaConsent.consentForReleaseOfInfo}
                  onChange={onChange}
                />
              }
              label="I consent to release of medical information"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="hipaaConsent.photoVideoRelease"
                  checked={formData.hipaaConsent.photoVideoRelease}
                  onChange={onChange}
                />
              }
              label="I consent to photo and video release"
            />
          </FormControl>
        </>
      );
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Patient
      </Typography>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      <Box sx={{ width: '100%', overflowX: 'auto' }}> {/* Added overflow for Stepper */}
        <Stepper activeStep={activeStep} sx={{ width: '100%' }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      <Box sx={{ mt: 2 }}>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Submit
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default CreatePatient;

