// src/components/TherapistDashboard.js
import React from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import CreateExercisePlan from './CreateExercisePlan';
import ViewProgress from './ViewProgress';
import ViewResources from './ViewResources';
import UploadResource from './UploadResource';
import AppointmentManagement from './AppointmentManagement';
import PatientList from './PatientList'; // Newly added component to display patients
import Layout from './Layout'; // Layout component for consistent UI structure

const TherapistDashboard = ({ userRole, patientId }) => {
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

            {/* Create Exercise Plan Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Create Exercise Plan
                </Typography>
                <CreateExercisePlan patientId={patientId} />
              </Paper>
            </Grid>

            {/* View Progress Section */}
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
