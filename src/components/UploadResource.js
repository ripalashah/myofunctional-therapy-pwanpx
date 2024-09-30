import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Select, MenuItem, Box, Paper, Typography } from '@mui/material'; // Removed Grid

const UploadResource = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    resourceType: 'Exercise',  // Default to 'Exercise'
    fileUrl: ''
  });

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/library/upload', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert(res.data.message);
    } catch (error) {
      console.error('Error uploading resource:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        Upload New Resource
      </Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Resource Title"
          name="title"
          value={formData.title}
          onChange={onChange}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Resource Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={onChange}
          margin="normal"
        />
        <Select
          fullWidth
          name="resourceType"
          value={formData.resourceType}
          onChange={onChange}
          margin="normal"
        >
          <MenuItem value="Exercise">Exercise</MenuItem>
          <MenuItem value="Video">Video</MenuItem>
          <MenuItem value="ResearchPaper">Research Paper</MenuItem>
          <MenuItem value="Presentation">Presentation</MenuItem>
        </Select>
        <TextField
          fullWidth
          label="File URL"
          name="fileUrl"
          value={formData.fileUrl}
          onChange={onChange}
          required
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Upload
        </Button>
      </Box>
    </Paper>
  );
};

export default UploadResource;
