// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute component to control access based on user role
const ProtectedRoute = ({ role, component: Component }) => {
  // Assume the token and role are stored in local storage (or you can use context)
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role'); // This should be set during login
  // Debugging: Check token and role values
  console.log('Token:', token);
  console.log('UserRole:', userRole);

  // Check if the user is authenticated and has the correct role
  if (!token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    // Redirect to a not authorized or default page if the role doesn't match
    return <Navigate to="/" />;
  }

  // Render the requested component if the role matches
  return <Component />;
};

export default ProtectedRoute;
