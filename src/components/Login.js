import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { AuthContext } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle input changes
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = 'http://localhost:5000/api/auth/login';

    try {
      // Make the POST request to the login endpoint
      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const userData = { token: res.data.token, role: res.data.role };

      // Store the token and role upon successful login
      login(userData);

      alert('Login successful');

      // Redirect based on user role
      switch (res.data.role) {
        case 'patient':
          navigate('/patient');
          break;
        case 'therapist':
          navigate('/therapist');
          break;
        case 'referral-source':
          navigate('/referral-dashboard');
          break;
        default:
          navigate('/');
          break;
      }
    } catch (error) {
      console.error('Login failed:', error);

      // Handle errors appropriately
      if (error.response) {
        if (error.response.status === 404) {
          setError('The login endpoint was not found. Please check the URL or server configuration.');
        } else if (error.response.status === 400) {
          setError('Invalid credentials. Please check your email and password.');
        } else {
          setError('An error occurred. Please try again later.');
        }
      } else if (error.request) {
        setError('Unable to connect to the server. Please ensure the backend is running.');
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Login
          </Typography>

          <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formData.email}
              onChange={onChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              label="Password"
              variant="outlined"
              value={formData.password}
              onChange={onChange}
              margin="normal"
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </Box>

          {/* Display error messages if any */}
          {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}

          {/* Links for password-related features */}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2">
            <Button onClick={() => navigate('/change-password')}>Change Password</Button>
            </Typography>
            <Typography variant="body2">
            <Button onClick={() => navigate('/forgot-password')}>Forgot Password</Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login;
