// backend/services/googleCalendar.js
const { google } = require('googleapis');
const { oauth2Client } = require('../middleware/googleAuth');

// Create a Google Calendar event
const createGoogleCalendarEvent = async (appointment) => {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  // Define the event details
  const event = {
    summary: `Appointment with Therapist`,
    description: `Appointment details: ${appointment.notes || 'No notes'}`,
    start: {
      dateTime: appointment.date.toISOString(),
      timeZone: 'America/New_York', // Adjust time zone as necessary
    },
    end: {
      dateTime: new Date(new Date(appointment.date).getTime() + 60 * 60 * 1000).toISOString(), // Example: 1 hour duration
      timeZone: 'America/New_York',
    },
    attendees: [
      { email: appointment.patientEmail }, // Patient's email
      { email: appointment.therapistEmail }, // Therapist's email
    ],
  };

  // Insert the event into the user's calendar
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    console.log('Event created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw error;
  }
};

module.exports = { createGoogleCalendarEvent };
