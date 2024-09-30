const mongoose = require('mongoose');

// Schema for Surgeries
const SurgerySchema = new mongoose.Schema({
  year: { type: Number },
  reason: { type: String },
  hospital: { type: String },
});

// Schema for Medications
const MedicationSchema = new mongoose.Schema({
  name: { type: String },
  strength: { type: String },
  frequency: { type: String },
});

// Schema for Allergies
const AllergySchema = new mongoose.Schema({
  type: { type: String, enum: ['Drug', 'Food', 'Environmental'] }, // Different types of allergies
  name: { type: String },
  reaction: { type: String },
});

// Schema for Developmental History
const DevelopmentalHistorySchema = new mongoose.Schema({
  milestone: { type: String },
  achieved: { type: Boolean }, // true if achieved, false if delayed
});

// Schema for Medical History
const MedicalHistorySchema = new mongoose.Schema({
  childhoodIllnesses: [String], // List of illnesses like Measles, Mumps, etc.
  immunizationDates: {
    tetanus: { type: Date },
    pneumonia: { type: Date },
    hepatitis: { type: Date },
    influenza: { type: Date },
    chickenpox: { type: Date },
  },
  medicalProblems: [String], // List of diagnosed medical problems
  surgeries: [SurgerySchema], // List of surgeries using the Surgery schema
  allergies: [AllergySchema], // List of allergies using the Allergy schema
  medications: [MedicationSchema], // List of medications using the Medication schema
  developmentalHistory: [DevelopmentalHistorySchema], // List of developmental milestones
  prenatalHistory: {
    term: { type: String, enum: ['40+ weeks', '39-37 weeks', '36-33 weeks', 'Other'] },
    complications: { type: String }, // Details about complications
  },
  feedingHistory: {
    breastfed: { type: Boolean },
    bottleFed: { type: Boolean },
    difficulties: [String], // Difficulties like reflux, latch issues, etc.
  },
  oralHabits: {
    pacifier: { type: Boolean },
    thumbSucking: { type: Boolean },
    otherHabits: { type: String },
  },
  dentalHistory: {
    dentistName: { type: String },
    lastVisit: { type: Date },
    dentalIssues: { type: String },
  },
  sleepPattern: {
    goodSleeper: { type: Boolean },
    concerns: { type: String },
  },
  surgeries: [SurgerySchema], // Linked surgeries
  foodIntolerances: [String], // List of food intolerances
  otherDetails: { type: String }, // Other general information
});

// Updated Patient Schema
const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  contact: { type: String },
  email: { type: String },
  address: { type: String }, // Added address for the patient
  occupation: { type: String },
  forms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' }],
  medicalHistory: MedicalHistorySchema, // Link to the detailed Medical History schema
  progressLogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProgressLog' }],
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }],
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', PatientSchema);
