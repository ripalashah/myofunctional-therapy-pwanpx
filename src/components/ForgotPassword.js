// frontend/src/components/ForgotPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess(res.data.msg);
    } catch (error) {
      console.error('Error in forgot password:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Forgot Password
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Send Reset Link
          </Button>
        </Box>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
