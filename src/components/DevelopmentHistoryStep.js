import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, Box, Typography } from '@mui/material';

const DevelopmentHistoryStep = ({ formData, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Developmental History
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Held head up</InputLabel>
        <Select
          name="developmentalHistory.heldHeadUp"
          value={formData.developmentalHistory.heldHeadUp}
          onChange={onChange}
          label="Held head up"
        >
          <MenuItem value="onTime">On Time</MenuItem>
          <MenuItem value="delayed">Delayed</MenuItem>
        </Select>
        <FormHelperText>Milestone: Held head up</FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Rolled over</InputLabel>
        <Select
          name="developmentalHistory.rolledOver"
          value={formData.developmentalHistory.rolledOver}
          onChange={onChange}
          label="Rolled over"
        >
          <MenuItem value="onTime">On Time</MenuItem>
          <MenuItem value="delayed">Delayed</MenuItem>
        </Select>
        <FormHelperText>Milestone: Rolled over</FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Walking</InputLabel>
        <Select
          name="developmentalHistory.walking"
          value={formData.developmentalHistory.walking}
          onChange={onChange}
          label="Walking"
        >
          <MenuItem value="onTime">On Time</MenuItem>
          <MenuItem value="delayed">Delayed</MenuItem>
        </Select>
        <FormHelperText>Milestone: Walking</FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Running</InputLabel>
        <Select
          name="developmentalHistory.running"
          value={formData.developmentalHistory.running}
          onChange={onChange}
          label="Running"
        >
          <MenuItem value="onTime">On Time</MenuItem>
          <MenuItem value="delayed">Delayed</MenuItem>
        </Select>
        <FormHelperText>Milestone: Running</FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Coloring</InputLabel>
        <Select
          name="developmentalHistory.coloring"
          value={formData.developmentalHistory.coloring}
          onChange={onChange}
          label="Coloring"
        >
          <MenuItem value="onTime">On Time</MenuItem>
          <MenuItem value="delayed">Delayed</MenuItem>
        </Select>
        <FormHelperText>Milestone: Coloring</FormHelperText>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Writing</InputLabel>
        <Select
          name="developmentalHistory.writing"
          value={formData.developmentalHistory.writing}
          onChange={onChange}
          label="Writing"
        >
          <MenuItem value="onTime">On Time</MenuItem>
          <MenuItem value="delayed">Delayed</MenuItem>
        </Select>
        <FormHelperText>Milestone: Writing</FormHelperText>
      </FormControl>
    </Box>
  );
};

export default DevelopmentHistoryStep;
