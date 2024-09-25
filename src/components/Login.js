// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(''); // State for error messages

    // Handle input changes
    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // Handle form submission
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous error messages

        // URL validation and error logging
        const url = 'http://localhost:5000/api/auth/login';

        try {
            // Check if the backend URL is reachable before making the request
            console.log('Attempting to connect to:', url);

            // Make the POST request to the login endpoint
            const res = await axios.post(url, formData);

            // Store the token in localStorage upon successful login
            localStorage.setItem('token', res.data.token);
            alert('Login successful');
        } catch (error) {
            // Log the error details to the console for debugging
            console.error('Login failed:', error);

            // Check if the error is related to a network issue
            if (error.response) {
                // Errors with response status codes
                if (error.response.status === 404) {
                    setError('The login endpoint was not found. Please check the URL or server configuration.');
                } else if (error.response.status === 400) {
                    setError('Invalid credentials. Please check your email and password.');
                } else {
                    setError('An error occurred. Please try again later.');
                }
            } else if (error.request) {
                // Errors with the request (e.g., server not responding)
                setError('Unable to connect to the server. Please ensure the backend is running.');
            } else {
                // Other errors (e.g., invalid setup)
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            {/* Display error messages if any */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Login;
