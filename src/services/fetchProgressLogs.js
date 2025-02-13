import axios from 'axios';

// Example function to fetch progress logs
const fetchProgressLogs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/progress-logs');
    return response.data;
  } catch (error) {
    console.error('Error fetching progress logs:', error);
    throw error;
  }
};

export default fetchProgressLogs;
