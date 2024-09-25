// backend/routes/appointments.js
const express = require('express');
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');

const router = express.Router();

// Patient books an appointment
router.post('/book', auth, async (req, res) => {
  const { therapistId, date } = req.body;
  try {
    const appointment = new Appointment({
      patient: req.user.id,
      therapist: therapistId,
      date,
    });
    await appointment.save();
    res.status(201).json({ msg: 'Appointment booked successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to book appointment' });
  }
});

// View patient appointments
router.get('/patient', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ patient: req.user.id }).populate('therapist', 'name');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ msg: 'Failed to fetch appointments' });
  }
});

// Cancel appointment (Patient or Therapist)
router.post('/cancel/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ msg: 'Appointment not found' });

    appointment.status = 'canceled';
    await appointment.save();

    res.json({ msg: 'Appointment canceled successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to cancel appointment' });
  }
});

module.exports = router;
