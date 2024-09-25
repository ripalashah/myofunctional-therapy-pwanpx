// backend/routes/store.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const auth = require('../middleware/auth');

// Get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

module.exports = router;

// backend/routes/store.js
const Order = require('../models/Order');

// Create a new order
router.post('/create-order', auth, async (req, res) => {
    try {
        const { products, totalPrice } = req.body;
        const newOrder = new Order({
            customerId: req.user.id,
            products,
            totalPrice,
            paymentStatus: 'Pending'  // Initial status
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

module.exports = router;
