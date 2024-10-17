// src/components/ExercisePlanManager.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button } from '@mui/material';

const ExercisePlanManager = ({ patientId }) => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/exercise-plans?patientId=${patientId}`);
        setPlans(response.data);
      } catch (error) {
        console.error('Error fetching exercise plans:', error);
      }
    };

    fetchPlans();
  }, [patientId]);

  return (
    <div>
      {plans.map((plan) => (
        <Card key={plan._id} sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h6">{plan.title}</Typography>
            <Typography>{plan.description}</Typography>
            <Button>Edit Plan</Button> {/* Implement edit functionality */}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExercisePlanManager;
