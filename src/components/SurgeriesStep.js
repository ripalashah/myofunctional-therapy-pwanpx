import React from 'react';
import { TextField, Button, Typography, Box, IconButton, Grid } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const SurgeriesStep = ({ formData, onChange, addSurgery, removeSurgery }) => {
  const handleSurgeryChange = (index, field, value) => {
    const updatedSurgeries = formData.surgeries.map((surgery, i) => 
      i === index ? { ...surgery, [field]: value } : surgery
    );
    onChange({ target: { name: 'surgeries', value: updatedSurgeries } });
  };

  return (
    <Box>
      <Typography variant="h6">Surgeries</Typography>
      
      {formData.surgeries.map((surgery, index) => (
        <Box key={index} mb={2}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Year"
                value={surgery.year}
                onChange={(e) => handleSurgeryChange(index, 'year', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Reason"
                value={surgery.reason}
                onChange={(e) => handleSurgeryChange(index, 'reason', e.target.value)}
                margin="normal"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Hospital"
                value={surgery.hospital}
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
          value={formData.hospitalizationYear}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Reason"
          name="hospitalizationReason"
          value={formData.hospitalizationReason}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Hospital"
          name="hospitalizationHospital"
          value={formData.hospitalizationHospital}
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
          value={formData.bloodTransfusion}
          onChange={onChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="If yes, please explain"
          name="bloodTransfusionExplanation"
          value={formData.bloodTransfusionExplanation}
          onChange={onChange}
          margin="normal"
        />
      </Box>
    </Box>
  );
};

export default SurgeriesStep;
