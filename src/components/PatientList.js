import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PatientList = () => {
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
            <Button variant="contained" color="primary" component={Link} to={`/patients/${patient._id}/history`}>
              View History
            </Button>
          </ListItem>
        ))
      ) : (
        <Typography>No patients found.</Typography>
      )}
    </List>
  );
};

export default PatientList;
