// src/components/Layout.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Check if user is logged in

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* Show navigation options only when the user is logged in */}
          {token ? (
            <Box sx={{ flexGrow: 1 }}>
              <Button color="inherit" component={Link} to="/patient">
                Patient Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/therapist">
                Therapist Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/referral-dashboard">
                Referral Dashboard
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Welcome to Westchester Myofunctional Therapy
            </Typography>
          )}
        </Toolbar>
      </AppBar>

      {/* Render children components, like Login or Dashboard pages */}
      <Box component="main" sx={{ padding: 3 }}>
        {children}
      </Box>
    </div>
  );
};

export default Layout;
