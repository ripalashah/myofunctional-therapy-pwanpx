import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component to control access based on user role
const ProtectedRoute = ({ role, component: Component }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // This should be set during login

  // Check if the user is authenticated and has the correct role
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // Redirect to home if the role doesn't match
    return <Navigate to="/" />;
  }

  // Render the requested component if the role matches
  return <Component />;
};

export default ProtectedRoute;
