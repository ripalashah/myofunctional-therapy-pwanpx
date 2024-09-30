import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box, Paper } from '@mui/material'; 

const CreatePatient = ({ onPatientCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
    email: '',
    medicalHistory: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form input changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/patients/create-patient', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}` // Therapist's token
        }
      });

      setSuccess('Patient created successfully');
      onPatientCreated(res.data); // Pass the new patient data to update the UI
    } catch (error) {
      setError('Failed to create patient');
      console.error('Error creating patient:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create New Patient
      </Typography>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {success && <Typography color="success.main" sx={{ mt: 2 }}>{success}</Typography>}
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          type="text"
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={onChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          type="number"
          name="age"
          label="Age"
          value={formData.age}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          type="text"
          name="contact"
          label="Contact"
          value={formData.contact}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email"
          value={formData.email}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          type="text"
          name="medicalHistory"
          label="Medical History"
          multiline
          rows={4}
          value={formData.medicalHistory}
          onChange={onChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Patient
        </Button>
      </Box>
    </Paper>
  );
};

export default CreatePatient;
