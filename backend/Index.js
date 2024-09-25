// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./config/db'); // Separate DB connection configuration file if needed
const authRoutes = require('./routes/auth'); // Ensure correct path to auth.js
const authMiddleware = require('./middleware/auth'); // For middleware

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust as needed for security in production)
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB (Optional: use connectDB function if you have separate config)
connectDB(); // Call this if you have a function defined in './config/db' for connecting to MongoDB

// Alternatively, directly connect to MongoDB here if not using a separate function
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myofunctional_therapy_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const userRoutes = require('./routes/UserRoutes'); // Ensure paths match your actual routes
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

// Use routes
app.use('/api/users', userRoutes); // Route handling user-related requests
app.use('/api/auth', authRoutes); // Route handling authentication-related requests
app.use('/api/appointments', appointmentRoutes); // Route handling appointment-related requests

// Root route
app.get('/', (req, res) => {
    res.send('API is running...'); // Basic root endpoint to confirm server is running
});

// Start the server
const PORT = process.env.PORT || 5000; // Use environment variable for PORT or default to 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
