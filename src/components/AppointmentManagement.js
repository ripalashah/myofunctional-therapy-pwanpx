// src/components/AppointmentManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, Grid, Box, Button } from '@mui/material';

const AppointmentManagement = ({ userRole }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch appointments based on user role (therapist or patient)
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const endpoint =
          userRole === 'therapist'
            ? 'http://localhost:3000/api/appointments/therapist-appointments'
            : 'http://localhost:3000/api/appointments/patient-appointments';
        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAppointments(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [userRole]);

  // Handle appointment cancellation
  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.patch(`http://localhost:5000/api/appointments/cancel/${appointmentId}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAppointments(appointments.filter((appt) => appt._id !== appointmentId));
      alert('Appointment canceled successfully');
    } catch (error) {
      console.error('Error canceling appointment:', error);
      alert('Failed to cancel the appointment');
    }
  };

  // Handle appointment rescheduling
  const handleRescheduleAppointment = async (appointmentId) => {
    // Logic for rescheduling goes here (e.g., prompt for new date and time, update Google Calendar)
    // Example placeholder logic (replace with actual implementation):
    alert('Reschedule functionality to be implemented');
  };

  if (loading) {
    return <Typography>Loading appointments...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Manage Appointments
        </Typography>
        {appointments.length === 0 ? (
          <Typography>No appointments available.</Typography>
        ) : (
          <Grid container spacing={3}>
            {appointments.map((appointment) => (
              <Grid item xs={12} key={appointment._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      Appointment with {appointment.patientId.name || 'Patient'} on{' '}
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </Typography>
                    <Typography>Status: {appointment.status}</Typography>
                    {userRole === 'therapist' && (
                      <Typography variant="body2" color="textSecondary">
                        Session Notes: {appointment.notes || 'No notes added'}
                      </Typography>
                    )}
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleCancelAppointment(appointment._id)}
                      >
                        Cancel Appointment
                      </Button>
                      {userRole === 'patient' && (
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ ml: 2 }}
                          onClick={() => handleRescheduleAppointment(appointment._id)}
                        >
                          Reschedule Appointment
                        </Button>
                      )}
                    </Box>
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

export default AppointmentManagement;
