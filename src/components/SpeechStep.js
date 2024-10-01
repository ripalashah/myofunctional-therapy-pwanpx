import React from 'react';
import { Checkbox, TextField, FormControlLabel, Typography, Box } from '@mui/material';

const SpeechStep = ({ formData, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Speech Details
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.speech.frustration}
            onChange={onChange}
            name="speech.frustration"
          />
        }
        label="Frustration with communication"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.speech.lisp}
            onChange={onChange}
            name="speech.lisp"
          />
        }
        label="Lisp"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.speech.speakingFast}
            onChange={onChange}
            name="speech.speakingFast"
          />
        }
        label="Difficult Speaking Fast"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.speech.stuttering}
            onChange={onChange}
            name="speech.stuttering"
          />
        }
        label="Stuttering"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.speech.soundIssues}
            onChange={onChange}
            name="speech.soundIssues"
          />
        }
        label="Trouble with Sounds"
      />

      {formData.speech.soundIssues && (
        <TextField
          fullWidth
          label="Which sounds?"
          name="speech.soundDetails"
          value={formData.speech.soundDetails}
          onChange={onChange}
          margin="normal"
        />
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.speech.mumbling}
            onChange={onChange}
            name="speech.mumbling"
          />
        }
        label="Mumbling or Speaking Softly"
      />
    </Box>
  );
};

export default SpeechStep;
