// backend/firebaseAdmin.js
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-your-serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://myofunctional-therapy-app.firebaseio.com"
});

module.exports = admin;
