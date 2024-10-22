// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve the user information from local storage or any authentication service
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // Set loading to false after checking localStorage
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', userData.role); // Store the role separately
    localStorage.setItem('token', userData.token); // Store the token separately
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove the token if stored separately
    localStorage.removeItem('role'); // Remove the role if stored separately
  };

  // Function to check if a user is logged in
  const isLoggedIn = () => {
    return !!user && !!localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
