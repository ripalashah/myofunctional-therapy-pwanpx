import React, { useState } from 'react';
import { Typography, Grid, TextField, Button, Select, MenuItem, InputLabel, FormControl, Paper } from '@mui/material';

const ResourceLibrary = () => {
  const [resourceType, setResourceType] = useState('Exercise'); // Default value
  const [searchTerm, setSearchTerm] = useState('');

  const handleResourceTypeChange = (event) => {
    setResourceType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Therapist Resource Library
      </Typography>

      {/* Upload Resource Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Upload New Resource
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Resource Title"
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Resource Description"
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="File URL"
              variant="outlined"
              size="small"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={resourceType}
                onChange={handleResourceTypeChange}
                label="Type"
              >
                <MenuItem value="Exercise">Exercise</MenuItem>
                <MenuItem value="Document">Document</MenuItem>
                <MenuItem value="Video">Video</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth>
              Upload
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Search Resource Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Therapist Library
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <TextField
              fullWidth
              label="Search Resources"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Type</InputLabel>
              <Select
                value={resourceType}
                onChange={handleResourceTypeChange}
                label="Type"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Exercise">Exercise</MenuItem>
                <MenuItem value="Document">Document</MenuItem>
                <MenuItem value="Video">Video</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* Placeholder for resources display */}
        <Typography sx={{ mt: 2 }}>No resources available.</Typography>
      </Paper>
    </Paper>
  );
};

export default ResourceLibrary;
