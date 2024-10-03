import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import Logo from '../assets/IMG_7145.png'; // Adjust the path to your logo

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // Get user role from localStorage

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page after logout
  };

  // Determine which dashboard links to show based on the user's role
  const isPatientDashboard = location.pathname.includes('/patient');
  const isTherapistDashboard = location.pathname.includes('/therapist');
  const isReferralDashboard = location.pathname.includes('/referral-dashboard');

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo and App Title */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography
              variant="h6"
              component={Link}
              to="/"
              style={{ color: 'white', textDecoration: 'none' }}
            >
              Welcome to Westchester Myofunctional Specialties Application
            </Typography>
          </div>

          {/* Show navigation options only when the user is logged in */}
          {token ? (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
              {/* Only show the Patient Dashboard link if userRole is "patient" */}
              {userRole === 'patient' && !isPatientDashboard && (
                <Button color="inherit" component={Link} to="/patient">
                  Patient Dashboard
                </Button>
              )}

              {/* Only show the Therapist Dashboard link if userRole is "therapist" */}
              {userRole === 'therapist' && !isTherapistDashboard && (
                <Button color="inherit" component={Link} to="/therapist">
                  Therapist Dashboard
                </Button>
              )}

              {/* Only show the Referral Dashboard link if userRole is "referral-source" */}
              {userRole === 'referral-source' && !isReferralDashboard && (
                <Button color="inherit" component={Link} to="/referral-dashboard">
                  Referral Dashboard
                </Button>
              )}

              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                
              </Typography>
            </Box>
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
