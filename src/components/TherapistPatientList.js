import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';

const TherapistPatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/therapists/patients', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Patients Under Your Care
        </Typography>
        <Grid container spacing={3}>
          {patients.map((patient) => (
            <Grid item xs={12} md={6} key={patient._id}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h6">{patient.name}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    // Logic to go to detailed patient view
                    window.location.href = `/patients/${patient._id}/history`;
                  }}
                >
                  View Full History
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default TherapistPatientList;
