// src/components/ProgressChart.js
import React, { useState, useEffect, useCallback } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Button, TextField, MenuItem, Box, Typography } from '@mui/material';
import axios from 'axios';

const ProgressChart = ({ patientId }) => {
  const [chartData, setChartData] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartType, setChartType] = useState('line'); // State for selecting chart type

  // Fetch progress data with useCallback to memoize the function
  const fetchProgressData = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/progress/progress-logs/${patientId}`, {
        params: {
          startDate: startDate || new Date().toISOString(),
          endDate: endDate || new Date().toISOString(),
        },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      const progressLogs = res.data;

      if (progressLogs.length > 0) {
        const dates = progressLogs.map((log) => new Date(log.createdAt).toLocaleDateString());
        const completionStatuses = progressLogs.map((log) =>
          log.exercises.reduce((acc, exercise) => acc + (exercise.status === 'completed' ? 1 : 0), 0)
        );

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Exercises Completed',
              data: completionStatuses,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: false,
            },
          ],
        });
      } else {
        setChartData({});
      }
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  }, [patientId, startDate, endDate]);

  // Fetch progress data when component mounts or dates change
  useEffect(() => {
    fetchProgressData();
  }, [fetchProgressData]);

  const handleFetchData = () => {
    fetchProgressData();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Progress Over Time
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Chart Type"
          select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          InputLabelProps={{ shrink: true }}
        >
          <MenuItem value="line">Line Chart</MenuItem>
          <MenuItem value="bar">Bar Chart</MenuItem>
        </TextField>
        <Button variant="contained" onClick={handleFetchData}>
          Fetch Data
        </Button>
      </Box>

      {/* Conditional rendering of the chart based on the selected chart type */}
      {Object.keys(chartData).length > 0 ? (
        chartType === 'line' ? (
          <Line data={chartData} />
        ) : (
          <Bar data={chartData} />
        )
      ) : (
        <Typography color="error">No data available for the selected period.</Typography>
      )}
    </Box>
  );
};

export default ProgressChart;
