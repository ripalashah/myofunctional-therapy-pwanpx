// frontend/src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Box } from '@mui/material';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.put(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword }, {
        headers: { 'Content-Type': 'application/json' },
      });
      setSuccess(res.data.msg);
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      console.error('Error in reset password:', error);
      setError('Invalid or expired token.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Reset Password
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            type="password"
            label="New Password"
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </Box>

        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
      </Paper>
    </Container>
  );
};

export default ResetPassword;
