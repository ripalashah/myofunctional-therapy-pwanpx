// src/components/TherapistDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import Layout from './Layout'; // Assuming you have a Layout component
import PatientList from './PatientList'; // Component for listing patients
import CreatePatient from './CreatePatient'; // Component for creating new patients
import CreateExercisePlan from './CreateExercisePlan'; // Component for creating exercise plans
import ViewProgress from './ViewProgress'; // Component for viewing progress logs
import UploadResource from './UploadResource'; // Component for uploading therapist resources
import ViewResources from './ViewResources'; // Component to view therapist resources
import AppointmentManagement from './AppointmentManagement'; // Component for managing appointments
import PatientHistory from './PatientHistory'; // Component for viewing patient history

const TherapistDashboard = () => {
  const [selectedPatientId, setSelectedPatientId] = useState(null); // State for selected patient ID
  const [openHistory, setOpenHistory] = useState(false); // Control modal open/close
  const [newPatients, setNewPatients] = useState([]);

  useEffect(() => {
    const fetchNewPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/therapists/new-patients', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setNewPatients(response.data);
      } catch (error) {
        console.error('Error fetching new patients:', error);
      }
    };
    
    fetchNewPatients();
  }, []);
  
  // Handle viewing patient history
  const handleViewHistory = (patient) => {
    setSelectedPatientId(patient._id); // Set the selected patient's ID
    setOpenHistory(true); // Open the history modal
  };

  // Handle closing the history modal
  const handleCloseHistory = () => {
    setOpenHistory(false);
    setSelectedPatientId(null); // Reset selected patient ID
  };

  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Therapist Dashboard
          </Typography>
          <Grid container spacing={4}>
            {/* Patient Management Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Patient Management
                </Typography>
                <PatientList onViewHistory={handleViewHistory} /> {/* Pass the handleViewHistory */}
              </Paper>
            </Grid>

            {/* Create New Patient Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  New Patient
                </Typography>
                <CreatePatient />
              </Paper>
            </Grid>

            {/* Create Exercise Plan Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Exercise Plan
                </Typography>
                <CreateExercisePlan patientId={selectedPatientId} />
              </Paper>
            </Grid>

            {/* Progress Logs Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Progress Logs for Patient
                </Typography>
                <ViewProgress />
              </Paper>
            </Grid>

            {/* Resource Library Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Therapist Resource Library
                </Typography>
                <UploadResource />
                <ViewResources />
              </Paper>
            </Grid>

            {/* Appointment Management Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Manage Appointments
                </Typography>
                <AppointmentManagement />
              </Paper>
            </Grid>
          </Grid>

          {/* Patient History Modal */}
          <Dialog open={openHistory} onClose={handleCloseHistory} fullWidth maxWidth="md">
            <DialogTitle>Patient History</DialogTitle>
            <DialogContent>
              {selectedPatientId ? (
                <PatientHistory patientId={selectedPatientId} onBack={handleCloseHistory} />
              ) : (
                <Typography>No patient selected.</Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseHistory} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </Layout>
  );
};

export default TherapistDashboard;
