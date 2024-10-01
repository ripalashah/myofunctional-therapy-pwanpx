import React from 'react';
import { TextField, Button, Box, Typography, Grid, Checkbox, FormControlLabel } from '@mui/material';

const DrugsOTCStep = ({ formData, onChange, addDrug, removeDrug }) => {
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        List Your Prescribed Drugs and Over-the-Counter Drugs (Vitamins, Inhalers)
      </Typography>

      {formData.drugs.map((drug, index) => (
        <Grid container spacing={2} key={index}>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Name the Drug"
              name={`drugs.${index}.name`}
              value={drug.name}
              onChange={onChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Strength"
              name={`drugs.${index}.strength`}
              value={drug.strength}
              onChange={onChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Frequency Taken"
              name={`drugs.${index}.frequency`}
              value={drug.frequency}
              onChange={onChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="secondary" onClick={() => removeDrug(index)}>
              Remove Drug
            </Button>
          </Grid>
        </Grid>
      ))}

      <Button color="primary" onClick={addDrug} sx={{ mt: 2 }}>
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
            name="allergies.drugName"
            value={formData.allergies.drugName}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Reaction you had"
            name="allergies.reaction"
            value={formData.allergies.reaction}
            onChange={onChange}
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
                checked={formData.allergies.pollen}
                onChange={onChange}
                name="allergies.pollen"
              />
            }
            label="Pollen"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies.dust}
                onChange={onChange}
                name="allergies.dust"
              />
            }
            label="Dust"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies.trees}
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
                checked={formData.allergies.redDye}
                onChange={onChange}
                name="allergies.redDye"
              />
            }
            label="Red Dye"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies.grass}
                onChange={onChange}
                name="allergies.grass"
              />
            }
            label="Grass"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies.latex}
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
                checked={formData.allergies.beeStings}
                onChange={onChange}
                name="allergies.beeStings"
              />
            }
            label="Bee Stings"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.allergies.food}
                onChange={onChange}
                name="allergies.food"
              />
            }
            label="Food"
          />
          <TextField
            fullWidth
            label="Other"
            name="allergies.other"
            value={formData.allergies.other}
            onChange={onChange}
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
                checked={formData.intolerances.gluten}
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
                checked={formData.intolerances.dairy}
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
                checked={formData.intolerances.redDye}
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
                checked={formData.intolerances.shellfish}
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
                checked={formData.intolerances.nuts}
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
                checked={formData.intolerances.eggs}
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
            name="intolerances.others"
            value={formData.intolerances.others}
            onChange={onChange}
            margin="normal"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DrugsOTCStep;
