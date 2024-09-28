// src/components/PatientList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Box } from '@mui/material';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch patients when the component loads
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('/api/patients/therapist-patients', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPatients(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patients:', error);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  if (loading) {
    return <Typography>Loading patients...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Patient List
        </Typography>
        {patients.length === 0 ? (
          <Typography>No patients available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {patients.map((patient) => (
              <Grid item xs={12} key={patient._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{patient.name}</Typography>
                    <Typography>Email: {patient.email}</Typography>
                    <Typography>Phone: {patient.phone}</Typography>
                    <Typography>Age: {patient.age}</Typography>
                    {/* Add more patient details as needed */}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default PatientList;
