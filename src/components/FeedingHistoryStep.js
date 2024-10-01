import React from 'react';
import { Checkbox, FormControlLabel, TextField, Radio, RadioGroup, FormControl, FormLabel, Box, Typography } from '@mui/material';

const FeedingHistoryStep = ({ formData, onChange }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Feeding History
      </Typography>

      <FormLabel>Infant History</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.feedingHistory.infantHistory.breastfed}
            onChange={onChange}
            name="feedingHistory.infantHistory.breastfed"
          />
        }
        label="Breastfed"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.feedingHistory.infantHistory.bottleFedBreastmilk}
            onChange={onChange}
            name="feedingHistory.infantHistory.bottleFedBreastmilk"
          />
        }
        label="Bottle Fed Breastmilk"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.feedingHistory.infantHistory.bottleFed}
            onChange={onChange}
            name="feedingHistory.infantHistory.bottleFed"
          />
        }
        label="Bottle Fed"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.feedingHistory.infantHistory.nasogastricTube}
            onChange={onChange}
            name="feedingHistory.infantHistory.nasogastricTube"
          />
        }
        label="Nasogastric Tube"
      />

      <FormLabel>Feeding Characterized By</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.feedingHistory.feedingCharacterizedBy.difficultyLatch}
            onChange={onChange}
            name="feedingHistory.feedingCharacterizedBy.difficultyLatch"
          />
        }
        label="Difficulty with Latch"
      />
      {/* Repeat for other "Feeding Characterized By" checkboxes... */}

      <FormLabel>Infant/Children/Adult</FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.feedingHistory.infantChildrenAdult.frustration}
            onChange={onChange}
            name="feedingHistory.infantChildrenAdult.frustration"
          />
        }
        label="Frustration when eating"
      />
      {/* Repeat for other "Infant/Children/Adult" checkboxes... */}

      <FormLabel>Quality of Feeding</FormLabel>
      <RadioGroup
        name="feedingHistory.qualityOfFeeding"
        value={formData.feedingHistory.qualityOfFeeding}
        onChange={onChange}
      >
        <FormControlLabel value="excellent" control={<Radio />} label="Excellent" />
        <FormControlLabel value="average" control={<Radio />} label="Average" />
        <FormControlLabel value="difficult" control={<Radio />} label="Difficult" />
        <FormControlLabel value="limited" control={<Radio />} label="Limited" />
        <FormControlLabel value="requireSupplement" control={<Radio />} label="Require Supplement" />
      </RadioGroup>

      <Typography variant="subtitle1" gutterBottom>
        Solid Food Introduction
      </Typography>
      {formData.feedingHistory.solidFoodIntroduction.map((food, index) => (
        <Box key={index}>
          <TextField
            fullWidth
            label={`${food.product} Month`}
            value={food.month}
            onChange={(e) => onChange({ target: { name: `feedingHistory.solidFoodIntroduction.${index}.month`, value: e.target.value } })}
            margin="normal"
          />
          <TextField
            fullWidth
            label={`${food.product} Response`}
            value={food.response}
            onChange={(e) => onChange({ target: { name: `feedingHistory.solidFoodIntroduction.${index}.response`, value: e.target.value } })}
            margin="normal"
          />
        </Box>
      ))}

      <FormLabel>Current Diet Quality</FormLabel>
      <RadioGroup
        name="feedingHistory.currentDietQuality"
        value={formData.feedingHistory.currentDietQuality}
        onChange={onChange}
      >
        <FormControlLabel value="good" control={<Radio />} label="Good Overall Eater" />
        <FormControlLabel value="average" control={<Radio />} label="Average" />
        <FormControlLabel value="limited" control={<Radio />} label="Limited Eater" />
        <FormControlLabel value="picky" control={<Radio />} label="Picky Eater" />
        <FormControlLabel value="restricted" control={<Radio />} label="Restricted" />
      </RadioGroup>

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.feedingHistory.canSwallowPills}
            onChange={onChange}
            name="feedingHistory.canSwallowPills"
          />
        }
        label="Can Swallow Pills"
      />

      <FormControlLabel
        control={
          <Checkbox
            checked={formData.feedingHistory.requiresFluids}
            onChange={onChange}
            name="feedingHistory.requiresFluids"
          />
        }
        label="Requires lots of fluids during mealtime"
      />
    </Box>
  );
};

export default FeedingHistoryStep;
