import React from 'react';
import { Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const PatientHistory = ({ patient }) => {
    if (!patient) {
        return <Typography color="error">No patient selected.</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Patient History: {patient?.name || 'Unknown'}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Email: {patient?.email}
            </Typography>

            <Typography variant="h6" gutterBottom>
                Medical History:
            </Typography>
            {patient?.medicalHistory ? (
                <List>
                    {Object.entries(patient.medicalHistory.toObject()).map(([key, value]) => (
                        <ListItem key={key}>
                            <ListItemText primary={`${key}: ${JSON.stringify(value)}`} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography>No medical history found.</Typography>
            )}

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
