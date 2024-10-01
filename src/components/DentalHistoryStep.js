import React from 'react';
import { TextField, FormControlLabel, Checkbox, Typography, Box, Grid } from '@mui/material';

const DentalHistoryStep = ({ formData, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>Dental History</Typography>

      {/* Dentist Information */}
      <TextField
        fullWidth
        label="Name of the Dentist"
        name="dentalHistory.dentistName"
        value={formData.dentalHistory.dentistName}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Address"
        name="dentalHistory.dentistAddress"
        value={formData.dentalHistory.dentistAddress}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Name of the Orthodontist"
        name="dentalHistory.orthodontistName"
        value={formData.dentalHistory.orthodontistName}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Orthodontist Address"
        name="dentalHistory.orthodontistAddress"
        value={formData.dentalHistory.orthodontistAddress}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Reason for Last Dental Visit"
        name="dentalHistory.lastVisitReason"
        value={formData.dentalHistory.lastVisitReason}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Date of Last Visit"
        name="dentalHistory.lastVisitDate"
        value={formData.dentalHistory.lastVisitDate}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="How often do you brush your teeth?"
        name="dentalHistory.brushingFrequency"
        value={formData.dentalHistory.brushingFrequency}
        onChange={onChange}
        margin="normal"
      />

      {/* Dental Questions */}
      <Typography variant="subtitle1" gutterBottom>Dental Issues</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.dentalProblem}
                onChange={onChange}
                name="dentalHistory.dentalProblem"
              />
            }
            label="Do you have any dental problems?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.teethSensitivity}
                onChange={onChange}
                name="dentalHistory.teethSensitivity"
              />
            }
            label="Are your teeth sensitive to hot, cold, sweets, biting, or chewing?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.frequentColdSores}
                onChange={onChange}
                name="dentalHistory.frequentColdSores"
              />
            }
            label="Do you frequently get cold sores, blisters, or other oral lesions?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.badOdorsTaste}
                onChange={onChange}
                name="dentalHistory.badOdorsTaste"
              />
            }
            label="Have you noticed any mouth odors or bad taste?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.gumBleeding}
                onChange={onChange}
                name="dentalHistory.gumBleeding"
              />
            }
            label="Do your gums bleed or hurt?"
          />
        </Grid>

        <Grid item xs={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.teethGrinding}
                onChange={onChange}
                name="dentalHistory.teethGrinding"
              />
            }
            label="Do you clench or grind your teeth while awake or asleep?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.biteProblems}
                onChange={onChange}
                name="dentalHistory.biteProblems"
              />
            }
            label="Does your bite feel uncomfortable or unusual?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.jawProblems}
                onChange={onChange}
                name="dentalHistory.jawProblems"
              />
            }
            label="Have you ever had problems with your jaw, joint, ear, or sides of the face?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.frequentHeadaches}
                onChange={onChange}
                name="dentalHistory.frequentHeadaches"
              />
            }
            label="Do you have frequent headaches?"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.dentalHistory.tmjTreatment}
                onChange={onChange}
                name="dentalHistory.tmjTreatment"
              />
            }
            label="Have you ever been treated for TMJ problem?"
          />
        </Grid>
      </Grid>

      {/* Orthodontic Treatment */}
      <Typography variant="subtitle1" gutterBottom>Orthodontic Treatment</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.dentalHistory.orthodonticTreatment}
            onChange={onChange}
            name="dentalHistory.orthodonticTreatment"
          />
        }
        label="Have you ever had orthodontic treatment (Phase I, Phase II, Palatal Expander, Head Gear)?"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.dentalHistory.bitePlate}
            onChange={onChange}
            name="dentalHistory.bitePlate"
          />
        }
        label="Have you ever had a bite plate or mouth guard?"
      />

      {/* Satisfaction with Appearance */}
      <Typography variant="subtitle1" gutterBottom>Satisfaction</Typography>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.dentalHistory.satisfiedWithSmile}
            onChange={onChange}
            name="dentalHistory.satisfiedWithSmile"
          />
        }
        label="Are you satisfied with the appearance of your smile?"
      />
      <TextField
        fullWidth
        label="If you could change your smile, what would you most like to change?"
        name="dentalHistory.smileChange"
        value={formData.dentalHistory.smileChange}
        onChange={onChange}
        margin="normal"
      />
    </Box>
  );
};

export default DentalHistoryStep;
