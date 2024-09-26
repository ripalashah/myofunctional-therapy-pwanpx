// src/components/PatientIncentives.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

const PatientIncentives = () => {
  const [incentives, setIncentives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchIncentives = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('http://localhost:5000/api/incentives/patient-incentives', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setIncentives(res.data);
    } catch (error) {
      setError('Failed to load incentives. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncentives();
  }, []);

  return (
    <Box>
      <Typography variant="h6">Your Rewards and Incentives</Typography>
      {loading && <CircularProgress />}
      {error && (
        <Box>
          <Typography color="error">{error}</Typography>
          <Button onClick={fetchIncentives}>Retry</Button>
        </Box>
      )}
      {!loading && !incentives.length && <Typography>No incentives yet. Keep up the good work!</Typography>}
      {incentives.map((incentive, index) => (
        <Box key={index}>
          <Typography variant="h6">{incentive.milestone}</Typography>
          <Typography>Reward: {incentive.reward}</Typography>
          <Typography>Date Earned: {new Date(incentive.completedAt).toLocaleDateString()}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PatientIncentives;
