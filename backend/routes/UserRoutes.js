// backend/routes/UserRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/auth'); // JWT middleware

// Create a new user
router.post('/create', async (req, res) => {
    const { name, email, password, role } = req.body;
    
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});

// Get all users (protected route)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Get a user by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user' });
    }
});

// Update a user by ID
router.put('/:id', authMiddleware, async (req, res) => {
    const { name, email, role } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});

// Delete a user by ID
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});

// User login (generate JWT token)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: 'Error during login' });
    }
});

module.exports = router;
