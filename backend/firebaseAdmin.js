// backend/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://your-app.firebaseio.com"
});

module.exports = admin;
