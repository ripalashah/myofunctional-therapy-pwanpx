// backend/middleware/googleAuth.js
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

// Replace these with your Google credentials
const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/api/auth/google/callback' // Adjust this based on your deployment URL
);

// Generate a URL for Google authentication
const getGoogleAuthURL = () => {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/calendar'],
  });
};

// Middleware to get access token after authentication
const getGoogleAccessToken = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

module.exports = { getGoogleAuthURL, getGoogleAccessToken, oauth2Client };
