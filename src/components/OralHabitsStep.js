import React from 'react';
import { Checkbox, FormControlLabel, TextField, Box, Typography } from '@mui/material';

const OralHabitsStep = ({ formData, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Oral Habits</Typography>

      {/* Pacifier */}
      <Typography variant="subtitle1">Pacifier</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.oralHabits.pacifier.duringDay}
            onChange={onChange}
            name="oralHabits.pacifier.duringDay"
          />
        }
        label="During Day"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.oralHabits.pacifier.atNight}
            onChange={onChange}
            name="oralHabits.pacifier.atNight"
          />
        }
        label="At Night"
      />
      <TextField
        fullWidth
        label="Resolved By (Age or Event)"
        name="oralHabits.pacifier.resolvedBy"
        value={formData.oralHabits.pacifier.resolvedBy}
        onChange={onChange}
        margin="normal"
      />

      {/* Thumb/Digit */}
      <Typography variant="subtitle1" gutterBottom>Thumb/Digit</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.oralHabits.thumbDigit.duringDay}
            onChange={onChange}
            name="oralHabits.thumbDigit.duringDay"
          />
        }
        label="During Day"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.oralHabits.thumbDigit.atNight}
            onChange={onChange}
            name="oralHabits.thumbDigit.atNight"
          />
        }
        label="At Night"
      />
      <TextField
        fullWidth
        label="Resolved By (Age or Event)"
        name="oralHabits.thumbDigit.resolvedBy"
        value={formData.oralHabits.thumbDigit.resolvedBy}
        onChange={onChange}
        margin="normal"
      />

      {/* Objects */}
      <Typography variant="subtitle1" gutterBottom>Objects</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.oralHabits.objects.duringDay}
            onChange={onChange}
            name="oralHabits.objects.duringDay"
          />
        }
        label="During Day"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.oralHabits.objects.atNight}
            onChange={onChange}
            name="oralHabits.objects.atNight"
          />
        }
        label="At Night"
      />
      <TextField
        fullWidth
        label="Resolved By (Age or Event)"
        name="oralHabits.objects.resolvedBy"
        value={formData.oralHabits.objects.resolvedBy}
        onChange={onChange}
        margin="normal"
      />
    </Box>
  );
};

export default OralHabitsStep;
