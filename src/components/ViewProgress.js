import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ViewProgress = ({ patientId }) => {
    const [progressLogs, setProgressLogs] = useState([]);

    // Use useCallback to memoize fetchProgressLogs
    const fetchProgressLogs = useCallback(async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/progress/progress-log/${patientId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Ensure a valid token is stored in localStorage
            });
            setProgressLogs(res.data); // Update state with fetched progress logs
        } catch (error) {
            console.error('Error fetching progress logs:', error);
        }
    }, [patientId]); // Include patientId as a dependency since it is used inside the function

    // useEffect to call fetchProgressLogs when patientId changes or fetchProgressLogs is updated
    useEffect(() => {
        fetchProgressLogs();
    }, [fetchProgressLogs]); // fetchProgressLogs is now stable because of useCallback

    return (
        <div>
            <h2>Progress Logs for Patient {patientId}</h2>
            {progressLogs.length > 0 ? (
                progressLogs.map((log, index) => (
                    <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
                        <p><strong>Session Date:</strong> {new Date(log.createdAt).toLocaleDateString()}</p>
                        <h4>Exercises:</h4>
                        {log.exercises.map((exercise, i) => (
                            <div key={i}>
                                <p>{exercise.exerciseTitle} - {exercise.status}</p>
                            </div>
                        ))}
                        <p><strong>Session Notes:</strong> {log.sessionNotes}</p>
                    </div>
                ))
            ) : (
                <p>No progress logs available for this patient.</p>
            )}
        </div>
    );
};

export default ViewProgress;
