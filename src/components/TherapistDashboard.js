// src/components/TherapistDashboard.js
import React from 'react';
import CreateExercisePlan from './CreateExercisePlan';
import ViewProgress from './ViewProgress';  // Component that shows patient progress

const TherapistDashboard = ({ patientId }) => {
    return (
        <div>
            <h1>Therapist Dashboard</h1>
            <CreateExercisePlan />  {/* Create new exercise plan */}
            <ViewProgress patientId={patientId} />  {/* Show progress for selected patient */}
        </div>
    );
};

export default TherapistDashboard;
