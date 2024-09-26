import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from './Layout';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get('/api/appointments', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAppointments(res.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Layout>
      <h2>Manage Appointments</h2>
      {appointments.map((appointment) => (
        <div key={appointment._id}>
          <p>{appointment.date} - {appointment.status}</p>
        </div>
      ))}
    </Layout>
  );
};

export default AppointmentManagement;
