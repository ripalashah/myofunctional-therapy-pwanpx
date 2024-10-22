// backend/models/MedicalHistory.js
const mongoose = require('mongoose');

// Schema for Medical Problems

  const SurgerySchema = new mongoose.Schema({
    year: { type: String },
    reason: { type: String },
    hospital: { type: String }
  });
   // Schema for Hospitalizations
  const HospitalizationSchema = new mongoose.Schema({
    year: { type: String },
    reason: { type: String },
    hospital: { type: String }
  });
  // Schema for Drugs
const DrugSchema = new mongoose.Schema({
    name: { type: String },
    strength: { type: String },
    frequency: { type: String }
  });
  
  // Schema for Allergies
  const AllergySchema = new mongoose.Schema({
    drugName: { type: String },
    reaction: { type: String },
    pollen: { type: Boolean, default: false },
    dust: { type: Boolean, default: false },
    trees: { type: Boolean, default: false },
    redDye: { type: Boolean, default: false },
    grass: { type: Boolean, default: false },
    latex: { type: Boolean, default: false },
    beeStings: { type: Boolean, default: false },
    food: { type: Boolean, default: false },
    other: { type: String }
  });
  
  // Schema for Food Intolerances
  const IntoleranceSchema = new mongoose.Schema({
    gluten: { type: Boolean, default: false },
    dairy: { type: Boolean, default: false },
    redDye: { type: Boolean, default: false },
    shellfish: { type: Boolean, default: false },
    nuts: { type: Boolean, default: false },
    eggs: { type: Boolean, default: false },
    others: { type: String }
  });
const MedicalHistorySchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    personalInfo: {
      name: { type: String, required: true },
      dob: { type: Date, required: true },
      maritalStatus: { type: String, enum: ['Single', 'Partnered', 'Married', 'Separated', 'Divorced', 'Widowed'] },
      gender: { type: String, enum: ['Male', 'Female', 'Other'] },
      address: { type: String },
      parentName: { type: String }, // If minor
      occupation: { type: String },
      phone: { type: String },
      email: { type: String, required: true },
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
      prematureBirth: { type: Boolean, default: false },
      feedingDisorder: { type: Boolean, default: false },
      seizures: { type: Boolean, default: false },
      eatingAppetiteProblems: { type: Boolean, default: false },
      otitisMedia: { type: Boolean, default: false },
      nasalObstruction: { type: Boolean, default: false },
      enlargedTonsils: { type: Boolean, default: false },
      earProblems: { type: Boolean, default: false },
      sinusInfection: { type: Boolean, default: false },
      snoring: { type: Boolean, default: false },
      reflux: { type: Boolean, default: false },
      deviatedSeptum: { type: Boolean, default: false },
      troubleSleeping: { type: Boolean, default: false },
      headachesMigraines: { type: Boolean, default: false },
      neckShoulderPain: { type: Boolean, default: false },
      geneticDisorder: { type: Boolean, default: false },
      bloodDiseases: { type: Boolean, default: false },
      pneumonia: { type: Boolean, default: false },
      asthma: { type: Boolean, default: false },
      heartMurmur: { type: Boolean, default: false },
      otherHeartCondition: { type: Boolean, default: false },
      chestPain: { type: Boolean, default: false },
      bloodPressure: { type: Boolean, default: false },
      kidneyProblems: { type: Boolean, default: false },
      lungProblems: { type: Boolean, default: false },
      thyroidProblems: { type: Boolean, default: false },
      liverProblems: { type: Boolean, default: false },
      diabetes: { type: Boolean, default: false },
      panicWhenStressed: { type: Boolean, default: false },
      addAdhd: { type: Boolean, default: false },
      depression: { type: Boolean, default: false },
      anxiety: { type: Boolean, default: false },
      mouthBreathing: { type: Boolean, default: false },
      celiacDisease: { type: Boolean, default: false }
    },
    surgeries: [SurgerySchema], // List of surgeries using the Surgery schema
    hospitalizations: [HospitalizationSchema], // List of hospitalizations using the Hospitalization schema
    bloodTransfusion: {
        hadTransfusion: { type: Boolean, default: false },
        explanation: { type: String }
    },
    drugs: [DrugSchema], // List of drugs using the Drug schema
    allergies: [AllergySchema], // Single allergies object using AllergySchema
    intolerances: [IntoleranceSchema], // Single intolerances object using IntoleranceSchema
    prenatalHistory: {
        history: { type: String }, // Normal, Atypical, Complications
        complications: { type: String }, // Describe complications
        term: { type: String }, // 40+ weeks, 39-37 weeks, etc.
        laborDelivery: { type: String }, // Normal, Induced, C-Section
        complications: {
          protractedLabor: { type: Boolean, default: false },
          forceps: { type: Boolean, default: false },
          vacuum: { type: Boolean, default: false }
        },
        csectionComplications: { type: String } // Describe C-Section complications
      },
    developmentalHistory: [{
        heldHeadUp: { type: String, enum: ['onTime', 'delayed'], default: 'onTime' },
        rolledOver: { type: String, enum: ['onTime', 'delayed'], default: 'onTime' },
        walking: { type: String, enum: ['onTime', 'delayed'], default: 'onTime' },
        running: { type: String, enum: ['onTime', 'delayed'], default: 'onTime' },
        coloring: { type: String, enum: ['onTime', 'delayed'], default: 'onTime' },
        writing: { type: String, enum: ['onTime', 'delayed'], default: 'onTime' }
    }],
    interventions: {
        speechTherapy: {
          name: { type: String },
          contactInfo: { type: String },
          reason: { type: String }
        },
        occupationalTherapy: {
          name: { type: String },
          contactInfo: { type: String },
          reason: { type: String }
        },
        physicalTherapy: {
          name: { type: String },
          contactInfo: { type: String },
          reason: { type: String }
        },
        abaTherapy: {
          name: { type: String },
          contactInfo: { type: String },
          reason: { type: String }
        },
        otherTherapy: {
          name: { type: String },
          contactInfo: { type: String },
          reason: { type: String }
        }
      },
      speech: {
        frustration: { type: Boolean, default: false },
        lisp: { type: Boolean, default: false },
        speakingFast: { type: Boolean, default: false },
        stuttering: { type: Boolean, default: false },
        soundIssues: { type: Boolean, default: false },
        soundDetails: { type: String },
        mumbling: { type: Boolean, default: false },
      },
      sensorySystem: {
        light: { type: Boolean, default: false },
        sound: { type: Boolean, default: false },
        texture: { type: Boolean, default: false },
        selfRegulation: { type: Boolean, default: false },
        hypersensitive: { type: Boolean, default: false },
        other: { type: String, default: '' },
      },
      
      sleepingPattern: {
        goodSleeper: { type: Boolean, default: false },  // Whether the patient is a good sleeper
        childSleepConcerns: { type: Boolean, default: false },  // Whether there are concerns about sleep
        childSleepExplanation: { type: String, default: '' },  // Explanation for any sleep concerns
      },
      
      oralHabits: {
        pacifier: {
          duringDay: { type: Boolean, default: false },  // Whether the patient uses a pacifier during the day
          atNight: { type: Boolean, default: false },    // Whether the patient uses a pacifier at night
          resolvedBy: { type: String }                 // When the pacifier habit was resolved (e.g., age)
        },
        thumbDigit: {
          duringDay: { type: Boolean, default: false },
          atNight: { type: Boolean, default: false },
          resolvedBy: { type: String }
          },
        objects: {
            duringDay: { type: Boolean, default: false },
            atNight: { type: Boolean, default: false },
            resolvedBy: { type: String }
           }
        },
    feedingHistory: {
        infantHistory: {
          breastfed: { type: Boolean, default: false },
          bottleFedBreastmilk: { type: Boolean, default: false },
          bottleFed: { type: Boolean, default: false },
          nasogastricTube: { type: Boolean, default: false },
        },
        feedingCharacterizedBy: {
          difficultyLatch: { type: Boolean, default: false },
          reflux: { type: Boolean, default: false },
          gastricDiscomfort: { type: Boolean, default: false },
          phasicBiteReflex: { type: Boolean, default: false },
          poorSuckSkill: { type: Boolean, default: false },
          poorMilkSupply: { type: Boolean, default: false },
          neededNippleShield: { type: Boolean, default: false },
          labialTie: { type: Boolean, default: false },
          tongueTie: { type: Boolean, default: false },
          mastitisInfections: { type: Boolean, default: false },
          poorRootingReflex: { type: Boolean, default: false },
        },
        infantChildrenAdult: {
          frustration: { type: Boolean, default: false },
          packingFood: { type: Boolean, default: false },
          difficultyTransitioning: { type: Boolean, default: false },
          chokingGagging: { type: Boolean, default: false },
          pickyEater: { type: Boolean, default: false },
          anyTexture: { type: Boolean, default: false },
          grazeFood: { type: Boolean, default: false },
          wontTryNewFood: { type: Boolean, default: false },
        },
        qualityOfFeeding: {
          type: String,
          enum: ['excellent', 'average', 'difficult', 'limited', 'requireSupplement'],
          default: 'average',
        },
        solidFoodIntroduction: [{
          product: { type: String },
          month: { type: String },
          response: {
            type: String,
            enum: ['WNL', 'Late Introduction', 'struggle', 'aversive'],
            default: 'WNL',
          },
        }],
        currentDietQuality: {
          type: String,
          enum: ['good', 'average', 'limited', 'picky', 'restricted'],
          default: 'good',
        },
        canSwallowPills: { type: Boolean, default: false },
        requiresFluids: { type: Boolean, default: false },
      },
    dentalHistory: {
      dentistName: { type: String },
      lastVisit: { type: Date },
      issues: { type: String },
    }
  },);
  
  module.exports = mongoose.model('MedicalHistory', MedicalHistorySchema);
  
