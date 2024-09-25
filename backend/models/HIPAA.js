// backend/models/HIPAA.js
const mongoose = require('mongoose');

const HIPAAFormSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    signedPrivacyPolicy: { type: Boolean, required: true },
    consentForBilling: { type: Boolean, required: true },
    consentForReleaseOfInfo: { type: Boolean, required: true },
    photoVideoRelease: { type: Boolean, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('HIPAAForm', HIPAAFormSchema);
