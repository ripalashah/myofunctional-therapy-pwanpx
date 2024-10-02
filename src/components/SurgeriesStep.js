import React from 'react';
import { TextField, Button, Typography, Box, IconButton, Grid } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const SurgeriesStep = ({ formData, onChange, addSurgery, removeSurgery, handleSurgeryChange }) => {

  return (
    <Box>
      <Typography variant="h6">Surgeries</Typography>
      
      {/* Render Surgeries if formData.surgeries is an array */}
      {(formData.surgeries || []).map((surgery, index) => (
        <Box key={index} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Year"
                value={surgery.year || ''} // Ensure it doesn't break if surgery.year is undefined
                onChange={(e) => handleSurgeryChange(index, 'year', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Reason"
                value={surgery.reason || ''} // Ensure it doesn't break if surgery.reason is undefined
                onChange={(e) => handleSurgeryChange(index, 'reason', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Hospital"
                value={surgery.hospital || ''} // Ensure it doesn't break if surgery.hospital is undefined
                onChange={(e) => handleSurgeryChange(index, 'hospital', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={() => removeSurgery(index)}>
                <RemoveCircleOutline />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ))}

      {/* Add Surgery Button */}
      <Button 
        startIcon={<AddCircleOutline />} 
        onClick={addSurgery} 
        variant="outlined" 
        color="primary"
      >
        Add Surgery
      </Button>

      <Box mt={4}>
        <Typography variant="h6">Other Hospitalizations</Typography>
        <TextField
          fullWidth
          label="Year"
          name="hospitalizationYear"
          value={formData.hospitalizationYear || ''} // Ensure it's a string, fallback to an empty string
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Reason"
          name="hospitalizationReason"
          value={formData.hospitalizationReason || ''} // Ensure it's a string, fallback to an empty string
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Hospital"
          name="hospitalizationHospital"
          value={formData.hospitalizationHospital || ''} // Ensure it's a string, fallback to an empty string
          onChange={onChange}
          margin="normal"
        />
        </Box>

        <Box mt={4}>
          <Typography variant="h6">Blood Transfusion</Typography>
          <TextField
            fullWidth
            label="Have you ever had a blood transfusion?"
            name="bloodTransfusion"
            value={formData.bloodTransfusion || ''} // Ensure it's a string, fallback to an empty string
            onChange={onChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="If yes, please explain"
            name="bloodTransfusionExplanation"
            value={formData.bloodTransfusionExplanation || ''} // Ensure it's a string, fallback to an empty string
            onChange={onChange}
            margin="normal"
          />
          </Box>
    </Box>
  );
};

export default SurgeriesStep;
