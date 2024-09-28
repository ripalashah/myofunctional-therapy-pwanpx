// src/components/GoogleAuthButton.js
import React from 'react';

const GoogleAuthButton = () => {
  const handleAuth = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Update this URL based on backend route
  };

  return (
    <button onClick={handleAuth}>
      Sync with Google Calendar
    </button>
  );
};

export default GoogleAuthButton;
