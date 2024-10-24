// src/components/PatientManagement.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import PatientHistory from './PatientHistory'; // Import PatientHistory to view patient's history

const PatientManagement = ({ onViewHistory }) => {
  const [patients, setPatients] = useState([]); // State to store the list of patients
  const [selectedPatient, setSelectedPatient] = useState(null); // State for selected patient

  // Fetch patients when component mounts
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/therapist-patients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    fetchPatients();
  }, []);

  // Function to handle patient history viewing
  const handleViewHistory = (patient) => {
    setSelectedPatient(patient); // Set the selected patient
    if (onViewHistory) {
      onViewHistory(patient); // Pass the selected patient to the parent component if provided
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patient Management
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Patient List
        </Typography>
        <List>
          {patients.map((patient) => (
            <ListItem key={patient._id} divider>
              <ListItemText primary={patient.name} secondary={patient.email} />
              <Button variant="contained" color="primary" onClick={() => handleViewHistory(patient)}>
                View History
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Display Patient History if selected */}
      {selectedPatient && (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Patient History: {selectedPatient.name}
          </Typography>
          <PatientHistory patient={selectedPatient} />
        </Paper>
      )}
    </Box>
  );
};

export default PatientManagement;
