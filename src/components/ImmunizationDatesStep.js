import React from 'react';
import { TextField, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ImmunizationDatesStep = ({ formData, handleDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h6" gutterBottom>
          Immunization Dates
        </Typography>
        <DatePicker
          label="Tetanus"
          value={formData.immunizationDates.tetanus}
          onChange={(date) => handleDateChange('immunizationDates.tetanus', date)}
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />
        <DatePicker
          label="Pneumonia"
          value={formData.immunizationDates.pneumonia}
          onChange={(date) => handleDateChange('immunizationDates.pneumonia', date)}
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />
        <DatePicker
          label="Hepatitis"
          value={formData.immunizationDates.hepatitis}
          onChange={(date) => handleDateChange('immunizationDates.hepatitis', date)}
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />
        <DatePicker
          label="Influenza"
          value={formData.immunizationDates.influenza}
          onChange={(date) => handleDateChange('immunizationDates.influenza', date)}
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />
        <DatePicker
          label="Chickenpox"
          value={formData.immunizationDates.chickenpox}
          onChange={(date) => handleDateChange('immunizationDates.chickenpox', date)}
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />
        <DatePicker
          label="MMR (Measles, Mumps, Rubella)"
          value={formData.immunizationDates.mmr}
          onChange={(date) => handleDateChange('immunizationDates.mmr', date)}
          renderInput={(params) => <TextField fullWidth margin="normal" {...params} />}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default ImmunizationDatesStep;