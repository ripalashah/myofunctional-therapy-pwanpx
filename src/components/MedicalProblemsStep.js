import React from 'react';
import { Checkbox, FormControlLabel, FormGroup, Typography, Box } from '@mui/material';

const MedicalProblemsStep = ({ formData, onChange }) => {
  const medicalConditions = [
    { label: 'Premature Birth', name: 'prematureBirth' },
    { label: 'Feeding Disorder', name: 'feedingDisorder' },
    { label: 'Any Seizures', name: 'seizures' },
    { label: 'Eating/Appetite Problems', name: 'eatingAppetiteProblems' },
    { label: 'Chronic Otitis Media', name: 'otitisMedia' },
    { label: 'Nasal Obstruction', name: 'nasalObstruction' },
    { label: 'Enlarged Tonsils/Adenoid', name: 'enlargedTonsils' },
    { label: 'Ear Problems', name: 'earProblems' },
    { label: 'Sinus Infection', name: 'sinusInfection' },
    { label: 'Snoring', name: 'snoring' },
    { label: 'Reflux', name: 'reflux' },
    { label: 'Deviated Septum', name: 'deviatedSeptum' },
    { label: 'Trouble Sleeping', name: 'troubleSleeping' },
    { label: 'Headaches/Migraines', name: 'headachesMigraines' },
    { label: 'Neck/Shoulder Pain', name: 'neckShoulderPain' },
    { label: 'Genetic Disorder', name: 'geneticDisorder' },
    { label: 'Blood Diseases', name: 'bloodDiseases' },
    { label: 'Pneumonia', name: 'pneumonia' },
    { label: 'Asthma', name: 'asthma' },
    { label: 'Heart Murmur', name: 'heartMurmur' },
    { label: 'Other Heart Condition', name: 'otherHeartCondition' },
    { label: 'Chest Pain/Shortness of Breath', name: 'chestPain' },
    { label: 'High/Low Blood Pressure', name: 'bloodPressure' },
    { label: 'Kidney Problems', name: 'kidneyProblems' },
    { label: 'Lung Problems', name: 'lungProblems' },
    { label: 'Thyroid Problems', name: 'thyroidProblems' },
    { label: 'Liver Problems', name: 'liverProblems' },
    { label: 'Diabetes', name: 'diabetes' },
    { label: 'Panic when Stressed', name: 'panicWhenStressed' },
    { label: 'ADD/ADHD', name: 'addAdhd' },
    { label: 'Depression', name: 'depression' },
    { label: 'Anxiety', name: 'anxiety' },
    { label: 'Mouth Open/Breathing Issues', name: 'mouthBreathing' },
    { label: 'Celiac Disease', name: 'celiacDisease' },
  ];

  return (
    <Box>
      <Typography variant="h6">Medical Problems</Typography>
      <FormGroup>
        {medicalConditions.map((condition, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={formData.medicalProblems[condition.name]}
                onChange={onChange}
                name={`medicalProblems.${condition.name}`}
              />
            }
            label={condition.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default MedicalProblemsStep;
