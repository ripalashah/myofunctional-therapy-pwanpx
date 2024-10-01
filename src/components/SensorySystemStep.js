import React from 'react';
import { Checkbox, FormControlLabel, TextField, Box } from '@mui/material';

const SensorySystemStep = ({ formData, setFormData }) => {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      sensorySystem: { ...prevData.sensorySystem, [name]: checked },
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      sensorySystem: { ...prevData.sensorySystem, [name]: value },
    }));
  };

  return (
    <Box>
      <FormControlLabel
        control={<Checkbox checked={formData.sensorySystem.light} onChange={handleCheckboxChange} name="light" />}
        label="Light"
      />
      <FormControlLabel
        control={<Checkbox checked={formData.sensorySystem.sound} onChange={handleCheckboxChange} name="sound" />}
        label="Sound"
      />
      <FormControlLabel
        control={<Checkbox checked={formData.sensorySystem.texture} onChange={handleCheckboxChange} name="texture" />}
        label="Texture"
      />
      <FormControlLabel
        control={<Checkbox checked={formData.sensorySystem.selfRegulation} onChange={handleCheckboxChange} name="selfRegulation" />}
        label="Self-regulation"
      />
      <FormControlLabel
        control={<Checkbox checked={formData.sensorySystem.hypersensitive} onChange={handleCheckboxChange} name="hypersensitive" />}
        label="Hypersensitive"
      />
      <TextField
        fullWidth
        label="Other"
        name="other"
        value={formData.sensorySystem.other}
        onChange={handleInputChange}
        margin="normal"
      />
    </Box>
  );
};

export default SensorySystemStep;
