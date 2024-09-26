// src/components/ReferralDashboard.js
import React from 'react';
import Layout from './Layout';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material'; // Import MUI components

const ReferralDashboard = () => {
  return (
    <Layout>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Referral Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to the Referral Source Dashboard. Here, you can manage your referrals and view related information.
          </Typography>

          <Grid container spacing={4}>
            {/* Manage Referrals Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Manage Referrals
                </Typography>
                <Typography variant="body2">
                  View, add, and manage all the referrals you have submitted.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  View Referrals
                </Button>
              </Paper>
            </Grid>

            {/* Referral Insights Section */}
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  Referral Insights
                </Typography>
                <Typography variant="body2">
                  Gain insights into your referred patients' progress and engagement.
                </Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  View Insights
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Layout>
  );
};

export default ReferralDashboard;

