// backend/routes/appointments.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const auth = require('../middleware/auth');
const {
  createGoogleCalendarEvent,
  listGoogleCalendarEvents,
} = require('../services/googleCalendar');

// Middleware to check access based on user roles
const checkAccess = (req, res, next) => {
  if (req.user.role === 'therapist' || req.user.role === 'patient') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
};

// Book a new appointment (Patient)
router.post('/book', auth, checkAccess, async (req, res) => {
  try {
    const { therapistId, date, time, patientEmail, therapistEmail } = req.body;

    // Ensure appointment date is in the future
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

    // Create Google Calendar event
    const googleEvent = await createGoogleCalendarEvent({
      summary: `Appointment with ${therapistEmail}`,
      description: 'Patient appointment',
      start: { dateTime: appointmentDate.toISOString() },
      end: { dateTime: new Date(appointmentDate.getTime() + 30 * 60000).toISOString() }, // Example: 30 min duration
      attendees: [{ email: patientEmail }, { email: therapistEmail }],
    });

    // Save Google Calendar event ID to appointment for future updates or cancellations
    appointment.googleCalendarEventId = googleEvent.id;
    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    console.error('Failed to book appointment:', error);
    res.status(500).json({ message: 'Failed to book appointment', error });
  }
});

// Get appointments for patients (Patient View)
router.get('/patient-appointments', auth, checkAccess, async (req, res) => {
  try {
    // Fetch appointments for the logged-in patient
    const appointments = await Appointment.find({ patientId: req.user.id });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
});

// Get all appointments for therapist (Therapist View)
router.get('/therapist-appointments', auth, checkAccess, async (req, res) => {
  try {
    // Fetch appointments managed by the logged-in therapist
    const appointments = await Appointment.find({ therapistId: req.user.id }).populate('patientId');
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appointments', error });
  }
});

// Cancel an appointment (Patient and Therapist)
router.patch('/cancel/:id', auth, checkAccess, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    // Check if appointment exists
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Role-based permission check
    if (
      (req.user.role === 'patient' && appointment.patientId.toString() !== req.user.id) ||
      (req.user.role === 'therapist' && appointment.therapistId.toString() !== req.user.id)
    ) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Enforce rescheduling constraints (e.g., 48-hour rule)
    const currentTime = new Date();
    const appointmentTime = new Date(appointment.date);
    const hoursDifference = (appointmentTime - currentTime) / 36e5;

    if (hoursDifference < 48 && req.user.role === 'patient') {
      return res.status(400).json({ message: 'Changes can only be made 48 hours before the appointment.' });
    }

    // Delete Google Calendar event if it exists
    if (appointment.googleCalendarEventId) {
      await deleteGoogleCalendarEvent(appointment.googleCalendarEventId);
    }

    appointment.status = 'canceled';
    await appointment.save();
    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel appointment', error });
  }
});

// Reschedule an appointment (Patient and Therapist)
router.patch('/reschedule/:id', auth, checkAccess, async (req, res) => {
  try {
    const { newDate, newTime } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    // Check if appointment exists
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Role-based permission check
    if (
      (req.user.role === 'patient' && appointment.patientId.toString() !== req.user.id) ||
      (req.user.role === 'therapist' && appointment.therapistId.toString() !== req.user.id)
    ) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Enforce rescheduling constraints (e.g., 48-hour rule for patients)
    const currentTime = new Date();
    const appointmentTime = new Date(newDate);
    const hoursDifference = (appointmentTime - currentTime) / 36e5;

    if (hoursDifference < 48 && req.user.role === 'patient') {
      return res.status(400).json({ message: 'Rescheduling is allowed only 48 hours before the appointment.' });
    }

    // Update appointment date and time
    appointment.date = new Date(newDate);
    appointment.time = newTime;

    // Update the Google Calendar event if it exists
    if (appointment.googleCalendarEventId) {
      await updateGoogleCalendarEvent(appointment.googleCalendarEventId, {
        summary: `Rescheduled Appointment with ${appointment.therapistEmail}`,
        start: { dateTime: appointment.date.toISOString() },
        end: { dateTime: new Date(appointment.date.getTime() + 30 * 60000).toISOString() }, // Adjusted to new time
      });
    }

    await appointment.save();
    res.status(200).json({ message: 'Appointment rescheduled successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reschedule appointment', error });
  }
});

module.exports = router;
