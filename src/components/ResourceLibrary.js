// src/components/ResourceLibrary.js
import React from 'react';
import UploadResource from './UploadResource'; // Import the component to upload new resources
import ViewResources from './ViewResources';   // Import the component to view existing resources
import { Box, Typography, Divider } from '@mui/material'; // MUI components for styling

const ResourceLibrary = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Therapist Resource Library
      </Typography>
      
      {/* Upload Section */}
      <Box sx={{ mb: 4 }}>
        <UploadResource />
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {/* View Resources Section */}
      <Box sx={{ mt: 4 }}>
        <ViewResources />
      </Box>
    </Box>
  );
};

export default ResourceLibrary;
