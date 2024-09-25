// backend/routes/notifications.js
const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');

// Send notification to a specific user
router.post('/send-notification', async (req, res) => {
    const { token, title, body } = req.body;

    const message = {
        notification: {
            title,
            body
        },
        token
    };

    try {
        await admin.messaging().send(message);
        res.status(200).json({ message: 'Notification sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

// backend/routes/notifications.js
router.post('/send-appointment-reminder', async (req, res) => {
    const { token, appointmentDate } = req.body;

    const message = {
        notification: {
            title: 'Appointment Reminder',
            body: `You have an appointment scheduled on ${appointmentDate}`
        },
        token
    };

    try {
        await admin.messaging().send(message);
        res.status(200).json({ message: 'Appointment reminder sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send reminder' });
    }
});


module.exports = router;
