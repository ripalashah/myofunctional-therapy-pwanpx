// backend/models/Form.js
const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  fields: [
    {
      label: { type: String },
      value: { type: String },
      type: { type: String },  // e.g., 'text', 'checkbox', etc.
    }
  ]
});

const Form = mongoose.model('Form', FormSchema);
module.exports = Form;
