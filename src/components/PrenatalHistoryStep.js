import React from 'react';
import { FormControl, FormControlLabel, RadioGroup, Radio, Checkbox, TextField, FormLabel, Box, Typography } from '@mui/material';

const PrenatalHistoryStep = ({ formData, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Prenatal History</Typography>

      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Prenatal History</FormLabel>
        <RadioGroup
          name="prenatalHistory.history"
          value={formData.prenatalHistory.history}
          onChange={onChange}
          row
        >
          <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
          <FormControlLabel value="Atypical" control={<Radio />} label="Atypical" />
          <FormControlLabel value="Complications" control={<Radio />} label="Complications" />
        </RadioGroup>
      </FormControl>

      {/* Describe Complications */}
      {formData.prenatalHistory.history === 'Complications' && (
        <TextField
          fullWidth
          name="prenatalHistory.complications"
          label="Describe Complications"
          value={formData.prenatalHistory.complications}
          onChange={onChange}
          margin="normal"
          multiline
          rows={4}
        />
      )}

      {/* Prenatal Term */}
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Prenatal Term</FormLabel>
        <RadioGroup
          name="prenatalHistory.term"
          value={formData.prenatalHistory.term}
          onChange={onChange}
          row
        >
          <FormControlLabel value="40+ weeks" control={<Radio />} label="40+ weeks" />
          <FormControlLabel value="39-37 weeks" control={<Radio />} label="39-37 weeks" />
          <FormControlLabel value="36-33 weeks" control={<Radio />} label="36-33 weeks" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      {/* Labor and Delivery */}
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Labor and Delivery</FormLabel>
        <RadioGroup
          name="prenatalHistory.laborDelivery"
          value={formData.prenatalHistory.laborDelivery}
          onChange={onChange}
          row
        >
          <FormControlLabel value="Normal" control={<Radio />} label="Normal" />
          <FormControlLabel value="Induced" control={<Radio />} label="Induced" />
          <FormControlLabel value="C-Section" control={<Radio />} label="C-Section" />
        </RadioGroup>
      </FormControl>

      {/* C-Section Complications */}
      {formData.prenatalHistory.laborDelivery === 'C-Section' && (
        <>
          <FormControlLabel
            control={
              <Checkbox
                name="prenatalHistory.complications.protractedLabor"
                checked={formData.prenatalHistory.complications.protractedLabor}
                onChange={onChange}
              />
            }
            label="Protracted Labor"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="prenatalHistory.complications.forceps"
                checked={formData.prenatalHistory.complications.forceps}
                onChange={onChange}
              />
            }
            label="Forceps"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="prenatalHistory.complications.vacuum"
                checked={formData.prenatalHistory.complications.vacuum}
                onChange={onChange}
              />
            }
            label="Vacuum"
          />

          {/* Describe C-Section Complications */}
          <TextField
            fullWidth
            name="prenatalHistory.csectionComplications"
            label="Describe Complications"
            value={formData.prenatalHistory.csectionComplications}
            onChange={onChange}
            margin="normal"
            multiline
            rows={3}
          />
        </>
      )}
    </Box>
  );
};

export default PrenatalHistoryStep;
