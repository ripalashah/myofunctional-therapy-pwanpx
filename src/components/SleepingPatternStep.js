import React from 'react';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

const SleepingPatternStep = ({ formData, onChange }) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            name="sleepingPattern.goodSleeper"
            checked={!!formData.sleepingPattern.goodSleeper}
            onChange={onChange}
          />
        }
        label="Are you a good Sleeper?"
      />

      <FormControlLabel
        control={
          <Checkbox
            name="sleepingPattern.childSleepConcerns"
            checked={!!formData.sleepingPattern.childSleepConcerns}
            onChange={onChange}
          />
        }
        label="Have you ever had concerns about your child’s sleep?"
      />

      {!!formData.sleepingPattern.childSleepConcerns && (
        <TextField
          fullWidth
          name="sleepingPattern.childSleepExplanation"
          label="Explain any concerns about your child’s sleep"
          value={formData.sleepingPattern.childSleepExplanation || ''}
          onChange={onChange}
          margin="dense"
          multiline
          rows={4}
        />
      )}
    </>
  );
};

export default SleepingPatternStep;
