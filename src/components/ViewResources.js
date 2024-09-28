// src/components/ViewResources.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Box, Typography, Paper } from '@mui/material';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceType, setResourceType] = useState('');

  // Memoize fetchResources to avoid re-creating the function on each render
  const fetchResources = useCallback(async () => {
    try {
      const res = await axios.get(`/api/library/resources?search=${searchTerm}&type=${resourceType}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setResources(res.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  }, [searchTerm, resourceType]); // Dependencies to ensure fetchResources is updated when searchTerm or resourceType changes

  // useEffect to call fetchResources when the component mounts or when fetchResources changes
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    <Box>
      <Typography variant="h5">Therapist Library</Typography>
      <TextField
        label="Search Resources"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        variant="outlined"
        sx={{ my: 2 }}
      />
      <Select
        value={resourceType}
        onChange={(e) => setResourceType(e.target.value)}
        displayEmpty
        sx={{ ml: 2, mb: 2 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Exercise">Exercise</MenuItem>
        <MenuItem value="Video">Video</MenuItem>
        <MenuItem value="ResearchPaper">Research Paper</MenuItem>
        <MenuItem value="Presentation">Presentation</MenuItem>
      </Select>
      <Box>
        {resources.length ? (
          resources.map((resource, index) => (
            <Paper key={index} sx={{ my: 2, p: 2 }}>
              <Typography variant="h6">{resource.title}</Typography>
              <Typography>{resource.description}</Typography>
              <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">View Resource</a>
            </Paper>
          ))
        ) : (
          <Typography>No resources available.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ViewResources;
