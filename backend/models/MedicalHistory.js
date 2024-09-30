// backend/models/MedicalHistory.js
const mongoose = require('mongoose');

const MedicalHistorySchema = new mongoose.Schema({
    personalInfo: {
      name: { type: String, required: true },
      dob: { type: Date, required: true },
      maritalStatus: { type: String, enum: ['Single', 'Partnered', 'Married', 'Separated', 'Divorced', 'Widowed'] },
      gender: { type: String, enum: ['Male', 'Female', 'Other'] },
      address: { type: String },
      parentName: { type: String }, // If minor
      occupation: { type: String },
      phone: { type: String },
      email: { type: String },
      physician: { type: String },
      lastPhysicalExam: { type: Date },
      chiefComplaint: { type: String },
    },
    childhoodIllnesses: {
      measles: { type: Boolean, default: false },
      mumps: { type: Boolean, default: false },
      rubella: { type: Boolean, default: false },
      chickenpox: { type: Boolean, default: false },
      rheumaticFever: { type: Boolean, default: false },
      polio: { type: Boolean, default: false },
      other: { type: String }
    },
    immunizationDates: {
      tetanus: { type: Date },
      pneumonia: { type: Date },
      hepatitis: { type: Date },
      influenza: { type: Date },
      chickenpox: { type: Date },
      mmr: { type: Date } // Measles, Mumps, Rubella
    },
    medicalProblems: {
      prematureBirth: { type: Boolean },
      feedingDisorder: { type: Boolean },
      seizures: { type: Boolean },
      enlargedTonsils: { type: Boolean },
      asthma: { type: Boolean },
      heartMurmur: { type: Boolean },
      otherHeartCondition: { type: Boolean },
      pneumonia: { type: Boolean },
      highLowBloodPressure: { type: Boolean },
      lungProblem: { type: Boolean },
      liverProblem: { type: Boolean },
      kidneyProblem: { type: Boolean },
      diabetes: { type: Boolean },
      thyroidProblem: { type: Boolean },
      sinusInfection: { type: Boolean },
      otherProblems: { type: String },
    },
    surgeries: [{
      year: { type: String },
      reason: { type: String },
      hospital: { type: String }
    }],
    hospitalizations: [{
      year: { type: String },
      reason: { type: String },
      hospital: { type: String }
    }],
    bloodTransfusion: {
      hadTransfusion: { type: Boolean },
      explanation: { type: String }
    },
    medications: [{
      name: { type: String },
      strength: { type: String },
      frequency: { type: String }
    }],
    allergies: [{
      type: { type: String },
      name: { type: String },
      reaction: { type: String }
    }],
    foodIntolerances: {
      gluten: { type: Boolean },
      dairy: { type: Boolean },
      redDye: { type: Boolean },
      shellfish: { type: Boolean },
      nuts: { type: Boolean },
      eggs: { type: Boolean },
      others: { type: String }
    },
    prenatalHistory: {
      term: { type: String, enum: ['40+ weeks', '39-37 weeks', '36-33 weeks', 'Other'] },
      complications: { type: String },
      deliveryMethod: { type: String, enum: ['Normal', 'Induced', 'C-Section', 'Forceps', 'Vacuum'] }
    },
    developmentalHistory: [{
      milestone: { type: String },
      achieved: { type: Boolean }
    }],
    oralHabits: {
      pacifier: { type: Boolean },
      thumbSucking: { type: Boolean },
      objectSucking: { type: Boolean },
    },
    feedingHistory: {
      breastfed: { type: Boolean },
      bottleFed: { type: Boolean },
      nasogastricTube: { type: Boolean },
      feedingIssues: { type: String },
      qualityOfFeeding: { type: String, enum: ['Excellent', 'Average', 'Difficult', 'Limited'] }
    },
    dentalHistory: {
      dentistName: { type: String },
      lastVisit: { type: Date },
      issues: { type: String },
    }
  });
  
  module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);
  
