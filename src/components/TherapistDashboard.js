import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Layout from './Layout'; // Assuming you have a Layout component
import PatientList from './PatientList'; // Your component for listing patients
import CreatePatient from './CreatePatient'; // Your component for creating new patients
import CreateExercisePlan from './CreateExercisePlan'; // Your component for creating exercise plans
import ViewProgress from './ViewProgress'; // Your component for viewing progress logs
import UploadResource from './UploadResource'; // Component for uploading therapist resources
import ViewResources from './ViewResources'; // Component to view therapist resources
import AppointmentManagement from './AppointmentManagement'; // Your component for managing appointments
import PatientHistory from './PatientHistory'; // Component for viewing patient history

const TherapistDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null); // Track selected patient for viewing history
  const [openHistory, setOpenHistory] = useState(false); // Control modal open/close

  // Function to handle viewing patient history
  const handleViewHistory = (patient) => {
    setSelectedPatient(patient); // Set the patient to view history
    setOpenHistory(true); // Open the modal
  };

  // Function to close the patient history modal
  const handleCloseHistory = () => {
    setOpenHistory(false);
    setSelectedPatient(null); // Reset selected patient
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
                <CreateExercisePlan />
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
              {selectedPatient ? (
                <PatientHistory patient={selectedPatient} />
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
