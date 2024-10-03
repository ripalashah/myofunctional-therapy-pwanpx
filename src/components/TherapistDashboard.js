import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Layout from './Layout'; // Assuming you have a Layout component
import PatientList from './PatientList'; // Your component for listing patients
import CreatePatient from './CreatePatient'; // Your component for creating new patients
import CreateExercisePlan from './CreateExercisePlan'; // Your component for creating exercise plans
import ViewProgress from './ViewProgress'; // Your component for viewing progress logs
import UploadResource from './UploadResource'; // Component for uploading therapist resources
import ViewResources from './ViewResources'; // Component to view therapist resources
import AppointmentManagement from './AppointmentManagement'; // Your component for managing appointments

const TherapistDashboard = () => {
  const [patientId, setPatientId] = useState(null); // Handle patient selection if necessary
  const userRole = 'therapist'; // Hardcode user role for this context

  const handlePatientCreated = (newPatientId) => {
    setPatientId(newPatientId); // Update patientId when a new patient is created
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
                <PatientList />
              </Paper>
            </Grid>

            {/* Create New Patient Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  New Patient
                </Typography>
                <CreatePatient onPatientCreated={handlePatientCreated} />
              </Paper>
            </Grid>

            {/* Create Exercise Plan Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Exercise Plan
                </Typography>
                <CreateExercisePlan patientId={patientId} />
              </Paper>
            </Grid>

            {/* Progress Logs Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Progress Logs for Patient
                </Typography>
                <ViewProgress patientId={patientId} />
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
                <AppointmentManagement userRole={userRole} />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default TherapistDashboard;
