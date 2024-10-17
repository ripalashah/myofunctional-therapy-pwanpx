// src/components/PatientProfile.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProgressChart from './ProgressChart';
import ProgressTracking from './ProgressTracking';
import PatientIncentives from './PatientIncentives';
import { Box, Typography, Divider } from '@mui/material';

const PatientProfile = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/patients/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching patient profile:', error);
      }
    };

    fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h4">{patient.name}'s Profile</Typography>
      <Divider />
      <Typography variant="h6">Contact: {patient.contact}</Typography>
      <ProgressChart patientId={id} />
      <ProgressTracking patientId={id} />
      <PatientIncentives patientId={id} />
    </Box>
  );
};

export default PatientProfile;
