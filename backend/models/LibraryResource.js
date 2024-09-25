// backend/models/LibraryResource.js
const mongoose = require('mongoose');

const LibraryResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    resourceType: { type: String, enum: ['Exercise', 'Video', 'ResearchPaper', 'Presentation'], required: true },
    fileUrl: { type: String, required: true },  // URL to the uploaded file
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LibraryResource', LibraryResourceSchema);
