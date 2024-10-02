import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]); // State to hold fetched patients
  const [error, setError] = useState(''); // State for handling errors
  const [loading, setLoading] = useState(true); // State for handling loading

  // Fetch patients when the component is mounted
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients/therapist-patients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add Authorization header if needed
          },
        });
        console.log('Fetched patients:', response.data); // Log fetched data
        setPatients(response.data); // Set patients data in state
      } catch (error) {
        // Handle the error with appropriate messages
        console.error('Error fetching patients:', error);
        setError('Failed to fetch patients.');
      } finally {
        setLoading(false); // Set loading to false once data is fetched or error is caught
      }
    };

    fetchPatients();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  // Show error if there is an issue
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // Render list of patients
  return (
    <List>
      {patients.length > 0 ? (
        patients.map((patient) => (
          <ListItem key={patient._id}>
            <ListItemText
              primary={patient.name}
              secondary={`Email: ${patient.email} | Contact: ${patient.contact || 'N/A'} | Linked User Email: ${patient.userId?.email || 'N/A'}`}
            />
            {/* Button for viewing patient history */}
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
