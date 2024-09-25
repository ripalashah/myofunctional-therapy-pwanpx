// backend/routes/exercise.js
const express = require('express');
const router = express.Router();
const ExercisePlan = require('../models/ExercisePlan');
const auth = require('../middleware/auth');
// backend/routes/exercise.js
const express = require('express');
const ExercisePlan = require('../models/ExercisePlan');
const authMiddleware = require('../middleware/auth');

// Create an exercise plan
router.post('/', authMiddleware, async (req, res) => {
    const { patientId, therapistId, exercises, notes } = req.body;
    try {
        const newPlan = new ExercisePlan({ patientId, therapistId, exercises, notes });
        await newPlan.save();
        res.status(201).json({ message: 'Exercise plan created successfully', newPlan });
    } catch (error) {
        res.status(500).json({ error: 'Error creating exercise plan' });
    }
});

// Fetch exercise plans for a patient or therapist
router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const plans = await ExercisePlan.find({ $or: [{ patientId: id }, { therapistId: id }] });
        res.json(plans);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching exercise plans' });
    }
});

// Update an exercise plan
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedPlan = await ExercisePlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ message: 'Exercise plan updated successfully', updatedPlan });
    } catch (error) {
        res.status(500).json({ error: 'Error updating exercise plan' });
    }
});

// Delete an exercise plan
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await ExercisePlan.findByIdAndDelete(req.params.id);
        res.json({ message: 'Exercise plan deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting exercise plan' });
    }
});

module.exports = router;

// Create Exercise Plan (Therapist)
router.post('/create-plan', auth, async (req, res) => {
    try {
        const { patientId, exercises } = req.body;
        const exercisePlan = new ExercisePlan({
            therapistId: req.user.id,
            patientId,
            exercises
        });
        await exercisePlan.save();
        res.status(201).json({ message: 'Exercise plan created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create exercise plan' });
    }
});

// Get Exercise Plan for Patient (Patient View)
router.get('/patient-plan/:patientId', auth, async (req, res) => {
    try {
        const exercisePlan = await ExercisePlan.findOne({ patientId: req.params.patientId });
        if (!exercisePlan) return res.status(404).json({ message: 'Exercise plan not found' });
        res.status(200).json(exercisePlan);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve exercise plan' });
    }
});

module.exports = router;
