// frontend/src/components/PatientDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientDashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/appointments/1', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                console.log('Fetched appointments:', response.data); 
                setAppointments(response.data);  // Store fetched appointments in state
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div>
            <h2>Your Appointments</h2>
            {appointments.length > 0 ? (
                <ul>
                    {appointments.map(appt => (
                        <li key={appt._id}>
                            {appt.date} - {appt.time} with Therapist {appt.therapistId}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No appointments available.</p>
            )}
        </div>
    );
};

export default PatientDashboard;
