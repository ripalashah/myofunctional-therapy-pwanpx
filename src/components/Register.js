import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'patient' });
  const navigate = useNavigate(); // React Router hook for navigation

  // Handle input changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle registration submission
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Register button clicked'); // Debugging log
    console.log('Form data:', formData); // Debugging log to see the data being submitted

    try {
      // Make sure the URL points to your running backend server
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration response:', response.data); // Debugging log to verify the response

      alert('Registration successful. Please login.');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <select name="role" value={formData.role} onChange={handleChange}>
        <option value="patient">Patient</option>
        <option value="therapist">Therapist</option>
        <option value="referral-source">Referral Source</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
