// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');
const { createGoogleCalendarEvent } = require('../services/googleCalendar');


// Create a new appointment (for Patients)
router.post('/book', auth, async (req, res) => {
  try {
    const { therapistId, date, time, patientEmail, therapistEmail } = req.body;

    // Ensure appointment date and time are in the future
    const appointmentDate = new Date(date);
    if (appointmentDate < new Date()) {
      return res.status(400).json({ message: 'Appointment date must be in the future.' });
    }

    const appointment = new Appointment({
      patientId: req.user.id,
      therapistId,
      date: appointmentDate,
      time,
      patientEmail,
      therapistEmail,
    });

    await appointment.save();
    // Create Google Calendar Event
    await createGoogleCalendarEvent({
      date: appointmentDate,
      patientEmail,
      therapistEmail,
      notes: 'Patient appointment',
    });

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to book appointment', error });
  }
});

// Cancel or change an appointment (for Patients)
router.patch('/cancel/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if the patient is allowed to make changes
    if (appointment.patientId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Check if the appointment can be changed (48 hours before)
    const currentTime = new Date();
    const appointmentTime = new Date(appointment.date);
    const hoursDifference = (appointmentTime - currentTime) / 36e5; // Convert milliseconds to hours

    if (hoursDifference < 48) {
      return res.status(400).json({ message: 'Changes can only be made 48 hours before the appointment.' });
    }

    appointment.status = 'canceled';
    await appointment.save();
    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel appointment', error });
  }
});

// Therapist manages appointments
router.get('/therapist-appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ therapistId: req.user.id }).populate('patientId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
});

module.exports = router;
