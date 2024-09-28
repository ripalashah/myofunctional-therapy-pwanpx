// backend/models/Resource.js
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  resourceType: { type: String, enum: ['Exercise', 'Video', 'ResearchPaper', 'Presentation'], required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Resource', ResourceSchema);
