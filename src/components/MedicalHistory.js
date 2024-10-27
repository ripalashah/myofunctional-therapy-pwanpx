// src/components/MedicalHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

const MedicalHistory = ({ onComplete }) => {
  const { patientId } = useParams();
  const [medicalHistory, setMedicalHistory] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!patientId) {
      setError('Patient ID is missing.');
      return;
    }

    const fetchMedicalHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/medical-history/${patientId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setMedicalHistory(response.data);
      } catch (error) {
        console.error('Error fetching medical history:', error);
        setError('Failed to fetch medical history.');
      }
    };

    fetchMedicalHistory();
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicalHistory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/medical-history/update/${patientId}`, { medicalHistory }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccess('Medical history updated successfully.');
      if (onComplete) onComplete();
    } catch (error) {
      console.error('Error updating medical history:', error);
      setError('Failed to update medical history.');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Medical History for Patient ID: {patientId || 'Unknown'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField
        fullWidth
        label="Chief Complaint"
        name="chiefComplaint"
        value={medicalHistory.chiefComplaint || ''}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Past Medical History"
        name="pastMedicalHistory"
        value={medicalHistory.pastMedicalHistory || ''}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Allergies"
        name="allergies"
        value={medicalHistory.allergies || ''}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Current Medications"
        name="currentMedications"
        value={medicalHistory.currentMedications || ''}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        Update Medical History
      </Button>
    </Box>
  );
};

export default MedicalHistory;
