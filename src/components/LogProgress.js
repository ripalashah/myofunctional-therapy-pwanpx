// frontend/src/components/LogProgress.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
} from '@mui/material'; // Importing MUI components

const LogProgress = () => {
  const [progressData, setProgressData] = useState({
    exercisePlanId: '',
    exercises: [{ exerciseTitle: '', status: '' }],
    sessionNotes: '',
  });

  // Use useCallback to memoize the fetchExercisePlan function
  const fetchExercisePlan = useCallback(async () => {
    try {
      const res = await axios.get(
        'http://localhost:5000/api/exercise/patient-plan/${patientId}',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setProgressData((prevData) => ({
        ...prevData,
        exercisePlanId: res.data._id,
        exercises: res.data.exercises.map((ex) => ({
          exerciseTitle: ex.title,
          status: '',
        })),
      }));
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchExercisePlan();
  }, [fetchExercisePlan]);

  const onChange = (e, index) => {
    const { name, value } = e.target;
    const exercises = [...progressData.exercises];
    exercises[index][name] = value;
    setProgressData({ ...progressData, exercises });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:5000/api/progress/log-progress',
        progressData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Log Progress
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            {progressData.exercises.map((exercise, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" component="p">
                      {exercise.exerciseTitle}
                    </Typography>
                    <Select
                      name="status"
                      value={exercise.status}
                      onChange={(e) => onChange(e, index)}
                      fullWidth
                      displayEmpty
                      variant="outlined"
                    >
                      <MenuItem value="">
                        <em>Select Status</em>
                      </MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="skipped">Skipped</MenuItem>
                      <MenuItem value="incomplete">Incomplete</MenuItem>
                    </Select>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid item xs={12}>
              <TextField
                name="sessionNotes"
                label="Session Notes"
                multiline
                rows={4}
                value={progressData.sessionNotes}
                onChange={(e) =>
                  setProgressData({ ...progressData, sessionNotes: e.target.value })
                }
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit Progress
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default LogProgress;
