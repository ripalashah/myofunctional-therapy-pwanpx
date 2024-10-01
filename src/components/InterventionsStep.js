import React from 'react';
import { TextField, Typography, Box } from '@mui/material';

const InterventionsStep = ({ formData, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        History of Intervention
      </Typography>

      {/* Speech Therapy */}
      <Typography variant="subtitle1">Speech Therapy</Typography>
      <TextField
        fullWidth
        name="interventions.speechTherapy.name"
        label="Name"
        value={formData.interventions.speechTherapy.name}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.speechTherapy.contactInfo"
        label="Contact Info"
        value={formData.interventions.speechTherapy.contactInfo}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.speechTherapy.reason"
        label="Reason"
        value={formData.interventions.speechTherapy.reason}
        onChange={onChange}
        margin="normal"
      />

      {/* Occupational Therapy */}
      <Typography variant="subtitle1">Occupational Therapy</Typography>
      <TextField
        fullWidth
        name="interventions.occupationalTherapy.name"
        label="Name"
        value={formData.interventions.occupationalTherapy.name}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.occupationalTherapy.contactInfo"
        label="Contact Info"
        value={formData.interventions.occupationalTherapy.contactInfo}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.occupationalTherapy.reason"
        label="Reason"
        value={formData.interventions.occupationalTherapy.reason}
        onChange={onChange}
        margin="normal"
      />

      {/* Physical Therapy */}
      <Typography variant="subtitle1">Physical Therapy</Typography>
      <TextField
        fullWidth
        name="interventions.physicalTherapy.name"
        label="Name"
        value={formData.interventions.physicalTherapy.name}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.physicalTherapy.contactInfo"
        label="Contact Info"
        value={formData.interventions.physicalTherapy.contactInfo}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.physicalTherapy.reason"
        label="Reason"
        value={formData.interventions.physicalTherapy.reason}
        onChange={onChange}
        margin="normal"
      />

      {/* ABA Therapy */}
      <Typography variant="subtitle1">ABA Therapy</Typography>
      <TextField
        fullWidth
        name="interventions.abaTherapy.name"
        label="Name"
        value={formData.interventions.abaTherapy.name}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.abaTherapy.contactInfo"
        label="Contact Info"
        value={formData.interventions.abaTherapy.contactInfo}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.abaTherapy.reason"
        label="Reason"
        value={formData.interventions.abaTherapy.reason}
        onChange={onChange}
        margin="normal"
      />

      {/* Other Therapy */}
      <Typography variant="subtitle1">Other Therapy</Typography>
      <TextField
        fullWidth
        name="interventions.otherTherapy.name"
        label="Name"
        value={formData.interventions.otherTherapy.name}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.otherTherapy.contactInfo"
        label="Contact Info"
        value={formData.interventions.otherTherapy.contactInfo}
        onChange={onChange}
        margin="normal"
      />
      <TextField
        fullWidth
        name="interventions.otherTherapy.reason"
        label="Reason"
        value={formData.interventions.otherTherapy.reason}
        onChange={onChange}
        margin="normal"
      />
    </Box>
  );
};

export default InterventionsStep;
