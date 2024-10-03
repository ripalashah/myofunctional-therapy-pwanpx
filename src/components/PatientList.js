import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

const PatientList = ({ onViewHistory }) => {
  const [patients, setPatients] = useState([]);  // State to hold patients
  const [error, setError] = useState('');        // State to hold errors
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/therapist-patients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Authorization header
          },
        });
        console.log('Fetched patients:', response.data);
        setPatients(response.data);  // Set fetched patients to state
      } catch (error) {
        console.error('Error fetching patients:', error);
        setError('Failed to fetch patients.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleDelete = async (patientId) => {
    const confirmation = window.confirm('Are you sure you want to delete this patient?');
    if (!confirmation) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Authorization token
        },
      });

      if (res.status === 200) {
        alert('Patient deleted successfully');
        // Refresh patient list after deletion
        setPatients((prevPatients) => prevPatients.filter((patient) => patient._id !== patientId));
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
      alert('Failed to delete patient.');
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <List>
      {patients.length > 0 ? (
        patients.map((patient) => (
          <ListItem key={patient._id}>
            <ListItemText
              primary={patient.name}
              secondary={`Email: ${patient.email} | Contact: ${patient.contact || 'N/A'} | Linked User Email: ${patient.userId?.email || 'N/A'}`}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              {/* This button triggers the onViewHistory callback, passing the selected patient */}
              <Button variant="contained" color="primary" onClick={() => onViewHistory(patient)}>
                View History
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(patient._id)}>
                Delete
              </Button>
            </Box>
          </ListItem>
        ))
      ) : (
        <Typography>No patients found.</Typography>
      )}
    </List>
  );
};

export default PatientList;
