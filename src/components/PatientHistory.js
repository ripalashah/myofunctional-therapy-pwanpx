import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const PatientHistory = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatientHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token if required
          },
        });
        setPatient(response.data);
      } catch (error) {
        console.error(error); // Log detailed error
        setError('Error fetching patient history.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientHistory();
  }, [id]);

  if (loading) return <CircularProgress />; // Show loading spinner
  if (error) return <Typography color="error">{error}</Typography>; // Show error message

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patient History: {patient?.userId?.name || 'Unknown'}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Email: {patient?.userId?.email}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Medical History:
      </Typography>
      <List>
        {patient?.medicalHistory && Object.keys(patient.medicalHistory).length ? (
          Object.keys(patient.medicalHistory).map((key) => (
            <ListItem key={key}>
              <ListItemText primary={`${key}: ${JSON.stringify(patient.medicalHistory[key])}`} />
            </ListItem>
          ))
        ) : (
          <Typography>No medical history found.</Typography>
        )}
      </List>

      <Typography variant="h6" gutterBottom>
        Appointments:
      </Typography>
      {patient?.appointments?.length ? (
        <List>
          {patient.appointments.map((appointment, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Appointment on: ${new Date(appointment.date).toLocaleDateString()}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No appointments found.</Typography>
      )}

      <Typography variant="h6" gutterBottom>
        Session Notes:
      </Typography>
      {patient?.progressLogs?.length ? (
        <List>
          {patient.progressLogs.map((log, index) => (
            <ListItem key={index}>
              <ListItemText primary={`Note: ${log.note}, Date: ${new Date(log.date).toLocaleDateString()}`} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography>No session notes found.</Typography>
      )}
    </Paper>
  );
};

export default PatientHistory;
