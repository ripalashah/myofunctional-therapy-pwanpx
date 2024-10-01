import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, Stepper, Step, StepLabel, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, Input } from '@mui/material';
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
    },
    childhoodIllnesses: { measles: false, mumps: false, rubella: false, chickenpox: false, other: '' },
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
    surgeries: [{ year: '', reason: '', hospital: '' }], // Initial empty surgery
    hospitalizations: [{ year: '', reason: '', hospital: '' }], // Initial empty hospitalization
    bloodTransfusion: {
      hadTransfusion: false,
      explanation: ''
    },
    drugs: [{ name: '', strength: '', frequency: '' }],
    allergies: { drugName: '', reaction: '', pollen: false, dust: false, trees: false, redDye: false, grass: false, latex: false, beeStings: false, food: false, other: '' },
    intolerances: { gluten: false, dairy: false, redDye: false, shellfish: false, nuts: false, eggs: false, others: '' },
    prenatalHistory: {
      history: '', // Normal, Atypical, Complications
      complications: '', // Description of complications
      term: '', // 40+ weeks, 39-37 weeks, 36-33 weeks, Other
      laborDelivery: '', // Normal, Induced, C-Section
      complications: {
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
      light: { type: Boolean, default: false },
      sound: { type: Boolean, default: false },
      texture: { type: Boolean, default: false },
      selfRegulation: { type: Boolean, default: false },
      hypersensitive: { type: Boolean, default: false },
      other: { type: String, default: '' },
    },
    sleepingPattern: {
      goodSleeper: { type: Boolean, default: false },
      childSleepConcerns: { type: Boolean, default: false },
      childSleepExplanation: { type: String, default: '' }, // For further explanation if any concerns
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
});

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeStep, setActiveStep] = useState(0); // Track the current step
  const [files, setFiles] = useState([]); // File upload state

  const steps = ['Personal Info', 'Childhood Illnesses', 'Medical Problems', 'Surgeries', 'Medications', 'Allergies', 'Dental History'];

  const handleNext = () => setActiveStep((prevStep) => prevStep + 1);
  const handleBack = () => setActiveStep((prevStep) => prevStep - 1);

  // Handle form input changes
  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name.split('.')[0]]: { ...formData[name.split('.')[0]], [name.split('.')[1]]: checked },
      });
    } else {
      setFormData({
        ...formData,
        [name.split('.')[0]]: { ...formData[name.split('.')[0]], [name.split('.')[1]]: value },
      });
    }
  };

  // Handle Date Changes for DatePickers
  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name.split('.')[0]]: { ...formData[name.split('.')[0]], [name.split('.')[1]]: date },
    });
  };

  // Handle file uploads
  const handleFileUpload = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles([...files, ...selectedFiles]);
  };

   // Add surgery
   const addSurgery = () => {
    setFormData({
      ...formData,
      surgeries: [...formData.surgeries, { year: '', reason: '', hospital: '' }]
    });
  };

  // Remove surgery
  const removeSurgery = (index) => {
    const updatedSurgeries = formData.surgeries.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      surgeries: updatedSurgeries
    });
  };

  // Example for managing the drugs list
  const addDrug = () => {
    setFormData(prevState => ({
      ...prevState,
      drugsOTC: [...prevState.drugsOTC, { name: '', strength: '', frequency: '' }] // Add an empty drug object
    }));
  };

  const removeDrug = (index) => {
    setFormData(prevState => ({
      ...prevState,
      drugsOTC: prevState.drugsOTC.filter((_, i) => i !== index) // Remove the drug at the specified index
    }));
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Submit formData and files via Axios
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('patientData', JSON.stringify(formData));
      files.forEach((file) => {
        formDataToSubmit.append('files', file);
      });

      const res = await axios.post('http://localhost:5000/api/patients/create-patient', formDataToSubmit, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Therapist's token
        },
      });

      setSuccess('Patient created successfully');
      onPatientCreated(res.data); // Pass the new patient data to update the UI
    } catch (error) {
      setError('Failed to create patient');
      console.error('Error creating patient:', error);
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
              margin="normal"
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date of Birth"
                value={formData.personalInfo.dob}
                onChange={(date) => handleDateChange('personalInfo.dob', date)}
                renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
              />
            </LocalizationProvider>

            <FormControl fullWidth margin="normal">
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

            <FormControl fullWidth margin="normal">
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
              margin="normal"
            />

            <TextField
              fullWidth
              name="personalInfo.phone"
              label="Phone Number"
              value={formData.personalInfo.phone}
              onChange={onChange}
              margin="normal"
            />

            <TextField
              fullWidth
              name="personalInfo.email"
              label="Email Address"
              value={formData.personalInfo.email}
              onChange={onChange}
              margin="normal"
            />
          </>
        );
      case 1:
        return <ChildhoodIllnessesStep formData={formData} onChange={onChange} />;
      case 2:
        return <MedicalProblemsStep formData={formData} onChange={onChange} />;
      case 3:
        return <SurgeriesStep formData={formData} onChange={onChange} addSurgery={addSurgery} removeSurgery={removeSurgery} />;
      case 4:
        return <DrugsOTCStep formData={formData} onChange={onChange} addDrug={addDrug} removeDrug={removeDrug} />;
      case 5:
        return <PrenatalHistoryStep formData={formData} onChange={onChange} />;
      case 6:
        return <DevelopmentHistoryStep formData={formData} onChange={onChange} />;
      case 7:
        return <InterventionsStep formData={formData} onChange={onChange} />;
      case 8:
        return <SpeechStep formData={formData} onChange={onChange} />;
      case 9:
        return <SensorySystemStep formData={formData} onChange={onChange} />;
      case 10:
        return <SleepingPatternStep formData={formData} onChange={onChange} />;
      case 11:
        return <FeedingHistoryStep formData={formData} onChange={onChange} />;
      case 12:
        return <OralHabitsStep formData={formData} onChange={onChange} />;
      case 13:
        return <DentalHistoryStep formData={formData} onChange={onChange} />;
      
        // return (
        //   <>
        //     <TextField
        //       fullWidth
        //       name="dentalHistory.dentistName"
        //       label="Dentist Name"
        //       value={formData.dentalHistory.dentistName}
        //       onChange={onChange}
        //       margin="normal"
        //     />
        //     <LocalizationProvider dateAdapter={AdapterDateFns}>
        //       <DatePicker
        //         label="Last Visit"
        //         value={formData.dentalHistory.lastVisit}
        //         onChange={(date) => handleDateChange('dentalHistory.lastVisit', date)}
        //         renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        //       />
        //     </LocalizationProvider>
        //   </>
        // );
      
      // case 7:
      //   return (
      //     <>
      //       <Typography variant="h6" gutterBottom>
      //         Upload Medical Documents
      //       </Typography>
      //       <Input type="file" multiple onChange={handleFileUpload} />
      //     </>
      //   );
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
