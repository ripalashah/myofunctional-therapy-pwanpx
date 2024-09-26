// frontend/src/components/PatientDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout'; // Import Layout component
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material'; // Import MUI components

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/appointments/1', {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        });
        console.log('Fetched appointments:', response.data);
        setAppointments(response.data); // Store fetched appointments in state
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Appointments
          </Typography>
          {appointments.length > 0 ? (
            <Grid container spacing={3}>
              {appointments.map((appt) => (
                <Grid item xs={12} sm={6} md={4} key={appt._id}>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Appointment
                      </Typography>
                      <Typography color="textSecondary">
                        Date: {appt.date}
                      </Typography>
                      <Typography color="textSecondary">
                        Time: {appt.time}
                      </Typography>
                      <Typography color="textSecondary">
                        With Therapist: {appt.therapistId}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="textSecondary">
              No appointments available.
            </Typography>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default PatientDashboard;
