// src/components/TherapistDashboard.js
import React from 'react';
import CreateExercisePlan from './CreateExercisePlan';
import ViewProgress from './ViewProgress';  // Component that shows patient progress
import Layout from './Layout'; // Import Layout component
import { Container, Typography, Grid, Paper, Box } from '@mui/material'; // Import MUI components

const TherapistDashboard = ({ patientId }) => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Therapist Dashboard
          </Typography>

          <Grid container spacing={4}>
            {/* Create Exercise Plan Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Create Exercise Plan
                </Typography>
                <CreateExercisePlan />
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
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default TherapistDashboard;
