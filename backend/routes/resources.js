const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource'); // Import the Resource model
const auth = require('../middleware/auth'); // Assuming you have auth middleware

// Create a new resource (POST)
router.post('/upload', auth, async (req, res) => {
  try {
    const { title, description, resourceType, fileUrl } = req.body;
    
    // Create a new resource entry
    const newResource = new Resource({
      title,
      description,
      resourceType,
      fileUrl,
    });

    await newResource.save();
    res.status(201).json({ message: 'Resource uploaded successfully', newResource });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload resource' });
  }
});

// Get all resources (GET)
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
});

module.exports = router;
