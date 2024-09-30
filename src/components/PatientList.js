import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/therapist-patients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use token from localStorage for authorization
          },
        });
        setPatients(response.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to fetch patients.');
      }
    };

    fetchPatients();
  }, []);

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
              secondary={`Email: ${patient.email} | Contact: ${patient.contact} | Linked User Email: ${patient.userId?.email || 'N/A'}`}
            />
          </ListItem>
        ))
      ) : (
        <Typography>No patients found.</Typography>
      )}
    </List>
  );
};

export default PatientList;
