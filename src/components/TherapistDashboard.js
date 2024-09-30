import React, { useState } from 'react';
import { Container, Typography, Grid, Paper, Box } from '@mui/material';
import CreatePatient from './CreatePatient';
import CreateExercisePlan from './CreateExercisePlan';
import ViewProgress from './ViewProgress';
import ViewResources from './ViewResources';
import UploadResource from './UploadResource';
import AppointmentManagement from './AppointmentManagement';
import PatientList from './PatientList';
import Layout from './Layout';

const TherapistDashboard = ({ userRole, patientId }) => {
  const [patients, setPatients] = useState([]);

  // Update patient list when a new patient is created
  const handlePatientCreated = (newPatient) => {
    setPatients([...patients, newPatient]);
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
