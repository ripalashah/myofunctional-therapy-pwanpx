import React from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const PatientHistory = ({ patient }) => {
  if (!patient) {
    return <Typography color="error">No patient selected.</Typography>;  // Handle the case when no patient is passed
  }

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
