import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper, Stepper, Step, StepLabel, FormControl, InputLabel, Select, MenuItem, FormHelperText, Alert, Input } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Import DatePicker from MUI X
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'; // Localization for DatePicker
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; // Adapter for date-fns

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
    medicalProblems: { asthma: false, pneumonia: false, diabetes: false },
    surgeries: [{ year: '', reason: '', hospital: '' }],
    dentalHistory: { dentistName: '', lastVisit: null },
    fileUploads: [], // To store uploaded files
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
      case 6:
        return (
          <>
            <TextField
              fullWidth
              name="dentalHistory.dentistName"
              label="Dentist Name"
              value={formData.dentalHistory.dentistName}
              onChange={onChange}
              margin="normal"
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Last Visit"
                value={formData.dentalHistory.lastVisit}
                onChange={(date) => handleDateChange('dentalHistory.lastVisit', date)}
                renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
              />
            </LocalizationProvider>
          </>
        );
      case 7:
        return (
          <>
            <Typography variant="h6" gutterBottom>
              Upload Medical Documents
            </Typography>
            <Input type="file" multiple onChange={handleFileUpload} />
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
