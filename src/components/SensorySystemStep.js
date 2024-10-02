import React from 'react';
import { Checkbox, FormControlLabel, TextField, Box } from '@mui/material';

const SensorySystemStep = ({ formData, setFormData }) => {

  // Handle Checkbox Changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      sensorySystem: { 
        ...prevData.sensorySystem, 
        [name]: checked 
      },
    }));
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      sensorySystem: { 
        ...prevData.sensorySystem, 
        [name]: value 
      },
    }));
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Checkbox 
            checked={formData.sensorySystem.light || false} 
            onChange={handleCheckboxChange} 
            name="light" 
          />
        }
        label="Light"
      />
      <FormControlLabel
        control={
          <Checkbox 
            checked={formData.sensorySystem.sound || false} 
            onChange={handleCheckboxChange} 
            name="sound" 
          />
        }
        label="Sound"
      />
      <FormControlLabel
        control={
          <Checkbox 
            checked={formData.sensorySystem.texture || false} 
            onChange={handleCheckboxChange} 
            name="texture" 
          />
        }
        label="Texture"
      />
      <FormControlLabel
        control={
          <Checkbox 
            checked={formData.sensorySystem.selfRegulation || false} 
            onChange={handleCheckboxChange} 
            name="selfRegulation" 
          />
        }
        label="Self-regulation"
      />
      <FormControlLabel
        control={
          <Checkbox 
            checked={formData.sensorySystem.hypersensitive || false} 
            onChange={handleCheckboxChange} 
            name="hypersensitive" 
          />
        }
        label="Hypersensitive"
      />
      <TextField
        fullWidth
        label="Other"
        name="other"
        value={formData.sensorySystem.other || ''}
        onChange={handleInputChange}
        margin="normal"
      />
    </Box>
  );
};

export default SensorySystemStep;
