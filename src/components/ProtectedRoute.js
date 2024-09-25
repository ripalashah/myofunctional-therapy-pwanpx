import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const userRole = localStorage.getItem('role'); // Fetch the user role from localStorage

  // Check if the user role matches the required role
  if (userRole === role) {
    return <Component {...rest} />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
