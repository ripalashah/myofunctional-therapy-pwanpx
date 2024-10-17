import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressTracking = () => {
  const [progressLogs, setProgressLogs] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/progress/logs', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setProgressLogs(res.data);
      } catch (error) {
        console.error('Error fetching progress logs:', error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div>
      <h2>Progress Tracking</h2>
      {progressLogs.map((log, index) => (
        <div key={index}>
          <p>Session: {new Date(log.createdAt).toLocaleDateString()}</p>
          <p>Notes: {log.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default ProgressTracking;
