import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { TextField, Select, MenuItem, Grid, Typography, Paper, FormControl, InputLabel, Box, Divider } from '@mui/material';

const ViewResources = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [resourceType, setResourceType] = useState('All');

  const fetchResources = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/library/resources`, {
        params: { search: searchTerm, type: resourceType === 'All' ? '' : resourceType },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setResources(res.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  }, [searchTerm, resourceType]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Therapist Library
      </Typography>
      
      <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Search Resources"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Resource Type</InputLabel>
            <Select
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              label="Resource Type"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Exercise">Exercise</MenuItem>
              <MenuItem value="Video">Video</MenuItem>
              <MenuItem value="ResearchPaper">Research Paper</MenuItem>
              <MenuItem value="Presentation">Presentation</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        {resources.length > 0 ? (
          resources.map((resource) => (
            <Box key={resource._id} sx={{ mb: 2 }}>
              <Typography variant="subtitle1"><strong>{resource.title}</strong></Typography>
              <Typography variant="body2">{resource.description}</Typography>
              <Typography variant="caption" color="textSecondary">Type: {resource.resourceType}</Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          ))
        ) : (
          <Typography>No resources available.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default ViewResources;
