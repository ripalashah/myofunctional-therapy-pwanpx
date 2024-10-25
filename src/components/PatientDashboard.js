// src/components/PatientDashboard.js
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust path to your AuthContext
import axios from 'axios';
import Layout from './Layout';
import ProgressChart from './ProgressChart'; // Ensure this is correctly imported
import PatientIncentives from './PatientIncentives';
import MedicalHistory from './MedicalHistory';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';

const PatientDashboard = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', therapistId: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [therapists, setTherapists] = useState([]);
  const { user } = useContext(AuthContext); // Fetch user from the context
  const [selectedTherapist, setSelectedTherapist] = useState(null); // State to handle the selected therapist

  // Fetch available therapists
  const fetchTherapists = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing. Please log in again.');
        return;
      }

      // Attempt to fetch therapists with the token
      const response = await axios.get('http://localhost:5000/api/therapists', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Check if the response contains therapists
      if (response.status === 200) {
        setTherapists(response.data);
      } else {
        setError('Unexpected response status. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching therapists:', error);

      if (error.response) {
        setError(`Failed to fetch therapists: ${error.response.data.message || 'Please try again.'}`);
      } else if (error.request) {
        setError('No response from the server. Please check your connection and try again.');
      } else {
        setError('Error setting up the request. Please try again.');
      }
    }
  }, []);

  // Fetch appointments for the patient
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/appointments/${patientId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAppointments(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching appointments:', error);
      setError('Failed to fetch appointments. Please try again.');
    }
  }, [patientId]);

  useEffect(() => {
    fetchAppointments();
    fetchTherapists();
  }, [fetchAppointments, fetchTherapists]);

  // Handle booking a new appointment
  const handleBookAppointment = async () => {
    const { date, time, therapistId } = newAppointment;

    // Basic validation
    if (!date || !time || !therapistId) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        'http://localhost:5000/api/appointments/book',
        {
          therapistId,
          date,
          time,
          patientEmail: user.email, // Assuming user is fetched from context or state
          therapistEmail: selectedTherapist?.email, // Fetch from selected therapist details
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setOpenDialog(false);
      setNewAppointment({ date: '', time: '', therapistId: '' });
      setError('');
      setLoading(false);
      fetchAppointments(); // Refresh appointments after booking
    } catch (error) {
      setLoading(false);
      setError('Failed to book the appointment. Please try again.');
      console.error('Error booking appointment:', error);
    }
  };

  // Handle canceling an appointment
  const handleCancelAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLoading(false);
      fetchAppointments(); // Refresh appointments after cancellation
    } catch (error) {
      setLoading(false);
      console.error('Error canceling appointment:', error);
      setError('Failed to cancel the appointment. Please try again.');
    }
  };

  // Open booking dialog
  const openBookingDialog = () => {
    setOpenDialog(true);
  };

  // Close booking dialog
  const closeBookingDialog = () => {
    setOpenDialog(false);
    setError('');
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Appointments
          </Typography>

          <Button variant="contained" color="primary" onClick={openBookingDialog} sx={{ mb: 2 }}>
            Book New Appointment
          </Button>

          {loading ? (
            <Typography variant="body1" color="textSecondary">
              Loading appointments...
            </Typography>
          ) : appointments.length > 0 ? (
            <Grid container spacing={3}>
              {appointments.map((appt) => (
                <Grid item xs={12} sm={6} md={4} key={appt._id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Appointment</Typography>
                      <Typography color="textSecondary">
                        Date: {new Date(appt.date).toLocaleDateString()}
                      </Typography>
                      <Typography color="textSecondary">Time: {appt.time}</Typography>
                      <Typography color="textSecondary">With Therapist: {appt.therapistName}</Typography>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleCancelAppointment(appt._id)}
                        sx={{ mt: 1 }}
                      >
                        Cancel Appointment
                      </Button>
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

        {/* Progress Chart Integration */}
        <ProgressChart patientId={patientId} />

        {/* Patient Incentives Integration */}
        <Box sx={{ mt: 4 }}>
          <PatientIncentives />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Complete Your Medical History
          </Typography>
          <MedicalHistory patientId={patientId} onComplete={() => alert('Medical history submitted successfully')} />
        </Box>
        
        {/* Appointment Booking Dialog */}
        <Dialog open={openDialog} onClose={closeBookingDialog}>
          <DialogTitle>Book New Appointment</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={newAppointment.date}
              onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              label="Time"
              type="time"
              value={newAppointment.time}
              onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
              sx={{ mt: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              select
              label="Select Therapist"
              value={newAppointment.therapistId}
              onChange={(e) => {
                setNewAppointment({ ...newAppointment, therapistId: e.target.value });
                const therapist = therapists.find(t => t._id === e.target.value); // Assuming therapists array is available
                setSelectedTherapist(therapist);
              }}
              sx={{ mt: 2 }}
            >
              {therapists.length > 0 ? (
                therapists.map((therapist) => (
                  <MenuItem key={therapist._id} value={therapist._id}>
                    {therapist.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No therapists available</MenuItem>
              )}
            </TextField>
            {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
          </DialogContent>
          <DialogActions>
            <Button onClick={closeBookingDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleBookAppointment} color="primary">
              Book Appointment
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default PatientDashboard;
