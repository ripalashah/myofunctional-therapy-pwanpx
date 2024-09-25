// src/components/ProgressChart.js
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const ProgressChart = ({ patientId }) => {
    const [chartData, setChartData] = useState({});

    const fetchProgressData = async () => {
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 30);  // Example: Past 30 days

            const res = await axios.get(`http://localhost:5000/api/progress/progress-logs/${patientId}`, {
                params: {
                    startDate: startDate.toISOString(),
                    endDate: new Date().toISOString()
                },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            const progressLogs = res.data;

            const dates = progressLogs.map(log => new Date(log.createdAt).toLocaleDateString());
            const completionStatuses = progressLogs.map(log => log.exercises.reduce((acc, exercise) => acc + (exercise.status === 'completed' ? 1 : 0), 0));

            setChartData({
                labels: dates,
                datasets: [{
                    label: 'Exercises Completed',
                    data: completionStatuses,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false
                }]
            });
        } catch (error) {
            console.error('Error fetching progress data:', error);
        }
    };

    useEffect(() => {
        fetchProgressData();
    }, [fetchProgressData]);  // Add the function as a dependency

    return (
        <div>
            <h2>Progress Over Time</h2>
            <Line data={chartData} />
        </div>
    );
};

export default ProgressChart;
