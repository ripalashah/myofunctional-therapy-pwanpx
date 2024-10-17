import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const ChangePassword = () => {
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const url = 'http://localhost:5000/api/auth/change-password';

    try {
      // Make the PUT request to the change password endpoint
      const res = await axios.put(url, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token
        },
      });

      setSuccess(res.data.message); // Display success message
      alert('Password changed successfully');
    } catch (error) {
      console.error('Password change failed:', error);

      // Handle errors appropriately
      if (error.response) {
        if (error.response.status === 400) {
          setError('Current password is incorrect.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h6" gutterBottom>
          Change Password
        </Typography>

        <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            type="password"
            name="currentPassword"
            label="Current Password"
            variant="outlined"
            value={formData.currentPassword}
            onChange={onChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            type="password"
            name="newPassword"
            label="New Password"
            variant="outlined"
            value={formData.newPassword}
            onChange={onChange}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Change Password
          </Button>
        </Box>

        {/* Display error or success messages if any */}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
      </Paper>
    </Container>
  );
};

export default ChangePassword;
