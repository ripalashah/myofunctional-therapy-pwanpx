// src/components/PatientIncentives.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientIncentives = () => {
    const [incentives, setIncentives] = useState([]);

    const fetchIncentives = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/incentives/patient-incentives', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setIncentives(res.data);
        } catch (error) {
            console.error('Error fetching incentives:', error);
        }
    };

    useEffect(() => {
        fetchIncentives();
    }, []);

    return (
        <div>
            <h2>Your Rewards and Incentives</h2>
            {incentives.length === 0 ? (
                <p>No incentives yet. Keep up the good work!</p>
            ) : (
                incentives.map((incentive, index) => (
                    <div key={index}>
                        <h3>{incentive.milestone}</h3>
                        <p>Reward: {incentive.reward}</p>
                        <p>Date Earned: {new Date(incentive.completedAt).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default PatientIncentives;
