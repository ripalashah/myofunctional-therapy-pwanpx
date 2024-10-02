import React from 'react';
import { TextField, Typography, Box, Grid } from '@mui/material';

const InterventionsStep = ({ formData, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        History of Intervention
      </Typography>

      {/* Speech Therapy */}
      <Typography variant="subtitle1">Speech Therapy</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.speechTherapy.name"
            label="Name"
            value={formData.interventions.speechTherapy.name || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.speechTherapy.contactInfo"
            label="Contact Info"
            value={formData.interventions.speechTherapy.contactInfo || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.speechTherapy.reason"
            label="Reason"
            value={formData.interventions.speechTherapy.reason || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
      </Grid>

      {/* Occupational Therapy */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Occupational Therapy</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.occupationalTherapy.name"
            label="Name"
            value={formData.interventions.occupationalTherapy.name || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.occupationalTherapy.contactInfo"
            label="Contact Info"
            value={formData.interventions.occupationalTherapy.contactInfo || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.occupationalTherapy.reason"
            label="Reason"
            value={formData.interventions.occupationalTherapy.reason || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
      </Grid>

      {/* Physical Therapy */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Physical Therapy</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.physicalTherapy.name"
            label="Name"
            value={formData.interventions.physicalTherapy.name || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.physicalTherapy.contactInfo"
            label="Contact Info"
            value={formData.interventions.physicalTherapy.contactInfo || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.physicalTherapy.reason"
            label="Reason"
            value={formData.interventions.physicalTherapy.reason || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
      </Grid>

      {/* ABA Therapy */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>ABA Therapy</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.abaTherapy.name"
            label="Name"
            value={formData.interventions.abaTherapy.name || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.abaTherapy.contactInfo"
            label="Contact Info"
            value={formData.interventions.abaTherapy.contactInfo || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.abaTherapy.reason"
            label="Reason"
            value={formData.interventions.abaTherapy.reason || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
      </Grid>

      {/* Other Therapy */}
      <Typography variant="subtitle1" sx={{ mt: 2 }}>Other Therapy</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.otherTherapy.name"
            label="Name"
            value={formData.interventions.otherTherapy.name || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.otherTherapy.contactInfo"
            label="Contact Info"
            value={formData.interventions.otherTherapy.contactInfo || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            name="interventions.otherTherapy.reason"
            label="Reason"
            value={formData.interventions.otherTherapy.reason || ''}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default InterventionsStep;
