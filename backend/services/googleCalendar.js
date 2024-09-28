// backend/services/googleCalendar.js
const { google } = require('googleapis');
const { oauth2Client } = require('../middleware/googleAuth');

// Create a calendar instance
const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Function to create a new calendar event
const createGoogleCalendarEvent = async (eventDetails) => {
  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: eventDetails,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Google Calendar event:', error);
    throw new Error('Failed to create event');
  }
};

// Function to delete a calendar event
const deleteGoogleCalendarEvent = async (eventId) => {
  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });
  } catch (error) {
    console.error('Error deleting Google Calendar event:', error);
    throw new Error('Failed to delete event');
  }
};

// Function to update a calendar event
const updateGoogleCalendarEvent = async (eventId, updatedDetails) => {
  try {
    const response = await calendar.events.update({
      calendarId: 'primary',
      eventId,
      requestBody: updatedDetails,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Google Calendar event:', error);
    throw new Error('Failed to update event');
  }
};

// Function to list calendar events (optional, if needed for additional features)
const listGoogleCalendarEvents = async () => {
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return response.data.items;
  } catch (error) {
    console.error('Error listing Google Calendar events:', error);
    throw new Error('Failed to list events');
  }
};

module.exports = {
  createGoogleCalendarEvent,
  deleteGoogleCalendarEvent,
  updateGoogleCalendarEvent,
  listGoogleCalendarEvents,
};
