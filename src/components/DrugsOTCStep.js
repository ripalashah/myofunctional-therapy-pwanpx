import React from 'react';
import { TextField, Button, Box, Typography, Grid, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';

const DrugsOTCStep = ({ formData, onChange, addDrug, removeDrug, handleDrugChange }) => {
  
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        List Your Prescribed Drugs and Over-the-Counter Drugs (Vitamins, Inhalers)
      </Typography>

      {/* Render Drugs if formData.drugs is an array */}
      {(formData.drugs || []).map((drug, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name the Drug"
              value={drug.name || ''} // Ensure it doesn't break if drug.name is undefined
              onChange={(e) => handleDrugChange(index, 'name', e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Strength"
              value={drug.strength || ''} // Ensure it doesn't break if drug.strength is undefined
              onChange={(e) => handleDrugChange(index, 'strength', e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Frequency Taken"
              value={drug.frequency || ''} // Ensure it doesn't break if drug.frequency is undefined
              onChange={(e) => handleDrugChange(index, 'frequency', e.target.value)}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <IconButton onClick={() => removeDrug(index)}>
              <RemoveCircleOutline />
            </IconButton>
          </Grid>
        </Grid>
      ))}

      {/* Add Drug Button */}
      <Button
        startIcon={<AddCircleOutline />}
        onClick={addDrug}
        variant="outlined"
        color="primary"
        sx={{ mt: 2 }}
      >
        Add Another Drug
      </Button>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Allergies
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Name of the Drug you are allergic to"
            value={formData.allergies?.drugName || ''} // Handle undefined allergy fields safely
            onChange={onChange}
            name="allergies.drugName"
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Reaction you had"
            value={formData.allergies?.reaction || ''} // Handle undefined allergy fields safely
            onChange={onChange}
            name="allergies.reaction"
            margin="normal"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Other Allergies
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies?.pollen || false}
                onChange={onChange}
                name="allergies.pollen"
              />
            }
            label="Pollen"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies?.dust || false}
                onChange={onChange}
                name="allergies.dust"
              />
            }
            label="Dust"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies?.trees || false}
                onChange={onChange}
                name="allergies.trees"
              />
            }
            label="Trees"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies?.redDye || false}
                onChange={onChange}
                name="allergies.redDye"
              />
            }
            label="Red Dye"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies?.grass || false}
                onChange={onChange}
                name="allergies.grass"
              />
            }
            label="Grass"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies?.latex || false}
                onChange={onChange}
                name="allergies.latex"
              />
            }
            label="Latex"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies?.beeStings || false}
                onChange={onChange}
                name="allergies.beeStings"
              />
            }
            label="Bee Stings"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies?.food || false}
                onChange={onChange}
                name="allergies.food"
              />
            }
            label="Food"
          />
          <TextField
            fullWidth
            label="Other"
            value={formData.allergies?.other || ''} // Handle undefined other allergies safely
            onChange={onChange}
            name="allergies.other"
            margin="normal"
          />
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Food Intolerances
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.intolerances?.gluten || false}
                onChange={onChange}
                name="intolerances.gluten"
              />
            }
            label="Gluten"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.intolerances?.dairy || false}
                onChange={onChange}
                name="intolerances.dairy"
              />
            }
            label="Dairy"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.intolerances?.redDye || false}
                onChange={onChange}
                name="intolerances.redDye"
              />
            }
            label="Red Dye"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.intolerances?.shellfish || false}
                onChange={onChange}
                name="intolerances.shellfish"
              />
            }
            label="Shellfish"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.intolerances?.nuts || false}
                onChange={onChange}
                name="intolerances.nuts"
              />
            }
            label="Nuts"
          />
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.intolerances?.eggs || false}
                onChange={onChange}
                name="intolerances.eggs"
              />
            }
            label="Eggs"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Others"
            value={formData.intolerances?.others || ''} // Handle undefined intolerance fields safely
            onChange={onChange}
            name="intolerances.others"
            margin="normal"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DrugsOTCStep;
