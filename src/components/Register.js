// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
  });
  const navigate = useNavigate(); // React Router hook for navigation

  // Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Register button clicked'); // Debugging log
    console.log('Form data:', formData); // Debugging log to see the data being submitted

    try {
      // Make sure the URL points to your running backend server
      await axios.post(
        'http://localhost:5000/api/auth/register',
        formData
      );

      alert('Registration successful. Please login.');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" gutterBottom>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleRegister}
          sx={{ mt: 3, width: '100%' }}
        >
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            required
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="role-label">Select Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Select Role"
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="therapist">Therapist</MenuItem>
              <MenuItem value="referral-source">Referral Source</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
