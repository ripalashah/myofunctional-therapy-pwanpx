// backend/models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },  // Image of the product
    stock: { type: Number, default: 0 },  // Number of items available
    category: { type: String, required: true }  // e.g., "Tools", "Books", "Brochures"
});

module.exports = mongoose.model('Product', ProductSchema);
