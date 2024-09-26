// src/components/CreateExercisePlan.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Grid, Typography, Paper, Box } from '@mui/material';

const CreateExercisePlan = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    exercises: [{ title: '', description: '', frequency: '', duration: '' }],
  });

  // Handle changes to input fields
  const onChange = (e, index) => {
    const { name, value } = e.target;
    const exercises = [...formData.exercises];
    exercises[index][name] = value;
    setFormData({ ...formData, exercises });
  };

  // Add another exercise input set
  const addExercise = () => {
    setFormData({
      ...formData,
      exercises: [
        ...formData.exercises,
        { title: '', description: '', frequency: '', duration: '' },
      ],
    });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/exercise/create-plan',
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert('Error creating exercise plan. Please try again.');
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create Exercise Plan
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Patient ID"
            name="patientId"
            value={formData.patientId}
            onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
            margin="normal"
          />

          {formData.exercises.map((exercise, index) => (
            <Grid container spacing={2} key={index} sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Exercise Title"
                  name="title"
                  value={exercise.title}
                  onChange={(e) => onChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={exercise.description}
                  onChange={(e) => onChange(e, index)}
                  multiline
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Frequency"
                  name="frequency"
                  value={exercise.frequency}
                  onChange={(e) => onChange(e, index)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Duration (minutes)"
                  name="duration"
                  type="number"
                  value={exercise.duration}
                  onChange={(e) => onChange(e, index)}
                />
              </Grid>
            </Grid>
          ))}

          <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={addExercise}>
              Add Another Exercise
            </Button>
            <Button type="submit" variant="contained" color="secondary">
              Create Plan
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateExercisePlan;
