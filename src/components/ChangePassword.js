// frontend/src/components/ChangePassword.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const ChangePassword = () => {
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext); // Access user from context for authorization

  // Handle input changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Make the PUT request to change password endpoint
      await axios.put(
        'http://localhost:5000/api/auth/change-password',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`, // Add authorization token
          },
        }
      );

      setSuccess('Password changed successfully.');
    } catch (error) {
      console.error('Change password failed:', error);

      // Handle errors appropriately
      if (error.response && error.response.status === 400) {
        setError('Incorrect current password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center' }}>
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

        {/* Display error messages if any */}
        {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
        {/* Display success message if password change is successful */}
        {success && <Typography color="primary" sx={{ mt: 2 }}>{success}</Typography>}
      </Paper>
    </Container>
  );
};

export default ChangePassword;
