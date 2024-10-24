// frontend/src/components/ChangePassword.js
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const ChangePassword = () => {
  const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext); // Access user from context for authorization

  // Debugging log to see if the component is being rendered
  useEffect(() => {
    console.log('ChangePassword component mounted');
  }, []);

  // Handle input changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation checks
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      // Make the PUT request to change password endpoint
      await axios.put(
        'http://localhost:5000/api/auth/change-password',
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.token}`, // Add authorization token
          },
        }
      );

      // If successful, set the success message
      setSuccess('Password changed successfully.');
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' }); // Clear form fields
    } catch (error) {
      console.error('Change password failed:', error);

      // Handle errors appropriately
      if (error.response && error.response.status === 400) {
        setError('Incorrect current password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
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
          <TextField
            fullWidth
            type="password"
            name="confirmPassword"
            label="Confirm New Password"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={onChange}
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? 'Changing...' : 'Change Password'}
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
