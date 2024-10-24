import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Paper,
  Button,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PatientHistory = ({ patientId, onBack }) => {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!patientId) {
      setError('Patient ID is missing');
      return;
    }

    const fetchPatientHistory = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:5000/api/patients/${patientId}/history`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPatient(response.data);
      } catch (err) {
        console.error('Error fetching patient history:', err);
        setError('Failed to fetch patient data.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatientHistory();
  }, [patientId]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }
  
  const renderList = (data) => {
    if (!data || Object.keys(data).length === 0) {
      return <Typography>No data available.</Typography>;
    }
  
    return (
      <List>
        {Object.entries(data).map(([key, value]) => {
          // Skip displaying "_id"
          if (key === '_id') {
            return null;
          }
  
          // Handle nested objects and arrays
          if (Array.isArray(value)) {
            return (
              <ListItem key={key}>
                <ListItemText
                  primary={`${key}:`}
                  secondary={
                    <List>
                      {value.map((item, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`Item ${index + 1}`}
                            secondary={renderList(item)}
                          />
                        </ListItem>
                      ))}
                    </List>
                  }
                />
              </ListItem>
            );
          } else if (typeof value === 'object' && value !== null) {
            return (
              <ListItem key={key}>
                <ListItemText
                  primary={`${key}:`}
                  secondary={renderList(value)}
                />
              </ListItem>
            );
          } else {
            // Render primitive values (string, number, boolean)
            return (
              <ListItem key={key}>
                <ListItemText primary={`${key}: ${value || 'N/A'}`} />
              </ListItem>
            );
          }
        })}
      </List>
    );
  };

  const renderMedicalHistory = () => {
    const {
      personalInfo,
      childhoodIllnesses,
      immunizationDates,
      medicalProblems,
      surgeries,
      bloodTransfusion,
      allergies,
      intolerances,
      developmentalHistory,
      prenatalHistory,
      interventions,
      speech,
      sensorySystem,
      sleepingPattern,
      oralHabits,
      feedingHistory,
      dentalHistory,
      hospitalizations,
      drugs,
    } = patient?.medicalHistory || {};

    return (
      <>
        {renderSection('Personal Info', renderList(personalInfo))}
        {renderSection('Childhood Illnesses', renderList(childhoodIllnesses))}
        {renderSection('Immunization Dates', renderList(immunizationDates))}
        {renderSection('Medical Problems', renderList(medicalProblems))}
        {renderSection('Surgeries', surgeries.length ? renderList(surgeries) : 'None')}
        {renderSection('Blood Transfusion', renderList(bloodTransfusion))}
        {renderSection('Allergies', allergies.length ? renderList(allergies[0]) : 'None')}
        {renderSection('Intolerances', intolerances.length ? renderList(intolerances[0]) : 'None')}
        {renderSection('Developmental History', developmentalHistory.length ? renderList(developmentalHistory[0]) : 'None')}
        {renderSection('Prenatal History', renderList(prenatalHistory))}
        {renderSection('Interventions', renderList(interventions))}
        {renderSection('Speech', renderList(speech))}
        {renderSection('Sensory System', renderList(sensorySystem))}
        {renderSection('Sleeping Pattern', renderList(sleepingPattern))}
        {renderSection('Oral Habits', renderList(oralHabits))}
        {renderSection('Feeding History', renderList(feedingHistory))}
        {renderSection('Dental History', renderList(dentalHistory))}
        {renderSection('Hospitalizations', hospitalizations.length ? renderList(hospitalizations[0]) : 'None')}
        {renderSection('Drugs', drugs.length ? renderList(drugs[0]) : 'None')}
      </>
    );
  };

  const renderSection = (title, content) => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {content || <Typography>No data available.</Typography>}
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Patient History: {patient?.name || 'Unknown'}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Email: {patient?.email || 'N/A'}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Address: {patient?.address || 'N/A'}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Occupation: {patient?.occupation || 'N/A'}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Medical History:
      </Typography>
      {patient?.medicalHistory ? renderMedicalHistory() : <Typography>No medical history available.</Typography>}

      <Button variant="contained" color="primary" onClick={onBack} sx={{ mt: 2 }}>
        Back to Patient List
      </Button>
    </Paper>
  );
};

export default PatientHistory;
