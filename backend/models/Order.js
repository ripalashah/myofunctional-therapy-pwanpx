// backend/models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
