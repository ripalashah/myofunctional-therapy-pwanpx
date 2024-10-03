const mongoose = require('mongoose');

const HIPAAFormSchema = new mongoose.Schema({
  signedPrivacyPolicy: { type: Boolean, required: true },
  consentForBilling: { type: Boolean, required: true },
  consentForReleaseOfInfo: { type: Boolean, required: true },
  photoVideoRelease: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now }
});

const HIPAA = mongoose.model('HIPAA', HIPAAFormSchema);
module.exports = HIPAA;
