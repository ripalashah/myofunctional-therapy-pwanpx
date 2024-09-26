// frontend/src/components/ViewProgress.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
} from '@mui/material'; // Importing MUI components

const ViewProgress = ({ patientId }) => {
  const [progressLogs, setProgressLogs] = useState([]);

  // Use useCallback to memoize fetchProgressLogs
  const fetchProgressLogs = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/progress/progress-log/${patientId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Ensure a valid token is stored in localStorage
        }
      );
      setProgressLogs(res.data); // Update state with fetched progress logs
    } catch (error) {
      console.error('Error fetching progress logs:', error);
    }
  }, [patientId]); // Include patientId as a dependency since it is used inside the function

  // useEffect to call fetchProgressLogs when patientId changes or fetchProgressLogs is updated
  useEffect(() => {
    fetchProgressLogs();
  }, [fetchProgressLogs]); // fetchProgressLogs is now stable because of useCallback

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Progress Logs for Patient {patientId}
        </Typography>
        {progressLogs.length > 0 ? (
          <Grid container spacing={3}>
            {progressLogs.map((log, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="p">
                      Session Date: {new Date(log.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      Exercises:
                    </Typography>
                    {log.exercises.map((exercise, i) => (
                      <Box key={i} sx={{ ml: 2 }}>
                        <Typography variant="body1">
                          {exercise.exerciseTitle} - {exercise.status}
                        </Typography>
                      </Box>
                    ))}
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      <strong>Session Notes:</strong> {log.sessionNotes}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary">
            No progress logs available for this patient.
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ViewProgress;
