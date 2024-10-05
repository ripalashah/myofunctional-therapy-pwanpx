// ChildhoodIllnessesStep.js

import React from 'react';
import { Checkbox, FormControlLabel, TextField } from '@mui/material';

const ChildhoodIllnessesStep = ({ formData, onChange }) => {
  return (
    <>
      <FormControlLabel
        control={<Checkbox checked={formData.childhoodIllnesses.measles} onChange={onChange} name="childhoodIllnesses.measles" />}
        label="Measles"
      />
      <FormControlLabel
        control={<Checkbox checked={formData.childhoodIllnesses.mumps} onChange={onChange} name="childhoodIllnesses.mumps" />}
        label="Mumps"
      />
      <FormControlLabel
        control={<Checkbox checked={formData.childhoodIllnesses.rubella} onChange={onChange} name="childhoodIllnesses.rubella" />}
        label="Rubella"
      />
      <FormControlLabel
        control={<Checkbox checked={formData.childhoodIllnesses.chickenpox} onChange={onChange} name="childhoodIllnesses.chickenpox" />}
        label="Chickenpox"
      />
      {/* Add rheumaticFever checkbox */}
      <FormControlLabel
        control={<Checkbox name="childhoodIllnesses.rheumaticFever" checked={formData.childhoodIllnesses.rheumaticFever} onChange={onChange}/>}
        label="Rheumatic Fever"
      />
      {/* Add polio checkbox */}
      <FormControlLabel
        control={ <Checkbox
            name="childhoodIllnesses.polio"
            checked={formData.childhoodIllnesses.polio}
            onChange={onChange}
          />
        }
        label="Polio"
      />
      <TextField
        fullWidth
        label="Other Childhood Illnesses"
        name="childhoodIllnesses.other"
        value={formData.childhoodIllnesses.other}
        onChange={onChange}
        margin="normal"
      />
    </>
  );
};

export default ChildhoodIllnessesStep;
