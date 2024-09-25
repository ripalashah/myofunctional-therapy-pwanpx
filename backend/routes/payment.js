// backend/routes/payment.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your-stripe-secret-key');

router.post('/create-payment', async (req, res) => {
    const { amount, currency } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({ amount, currency });
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: 'Payment creation failed' });
    }
});

module.exports = router;
