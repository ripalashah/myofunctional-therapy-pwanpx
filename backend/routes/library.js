// backend/routes/library.js
const express = require('express');
const router = express.Router();
const LibraryResource = require('../models/LibraryResource');
const auth = require('../middleware/auth');

// Upload new resource
router.post('/upload', auth, async (req, res) => {
    try {
        const { title, description, resourceType, fileUrl } = req.body;

        const newResource = new LibraryResource({
            title,
            description,
            resourceType,
            fileUrl,
            uploadedBy: req.user.id,
        });

        await newResource.save();
        res.status(201).json({ message: 'Resource uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload resource' });
    }
});

// Get Resources with Filters
router.get('/resources', auth, async (req, res) => {
    try {
        const { search, type } = req.query;
        const query = {};
        if (search) query.title = { $regex: search, $options: 'i' };
        if (type) query.resourceType = type;

        const resources = await LibraryResource.find(query);
        res.status(200).json(resources);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch resources' });
    }
});

module.exports = router;
