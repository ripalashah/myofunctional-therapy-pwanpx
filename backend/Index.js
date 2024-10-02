// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
const connectDB = require('./config/db'); // Ensure this points to your DB connection file
const authRoutes = require('./routes/auth'); // Path to authentication routes
const userRoutes = require('./routes/UserRoutes'); // Path to user-related routes
const appointmentRoutes = require('./routes/appointments'); // Path to appointment routes
const therapistRoutes = require('./routes/therapists'); // Ensure this points to the correct route file
const patientRoutes = require('./routes/patients'); // Ensure this points to the correct route file
const exerciseRoutes = require('./routes/exercise'); // Ensure this points to the correct file
const formRoutes = require('./routes/forms'); // Import the forms route
const incentiveRoutes = require('./routes/incentives'); // Add the incentive routes here
const libraryRoutes = require('./routes/library'); // Add the library routes here
const storeRoutes = require('./routes/store'); // Path to store-related routes (products and orders)
const progressRoutes = require('./routes/progress'); // Path to progress-related routes
const resourcesRoutes = require('./routes/resources'); // Path to resources-related routes
const sleepQuestionnaireRoutes = require('./routes/sleepQuestionnaire'); // Import the sleep questionnaire routes
const hipaaRoutes = require('./routes/hipaa');

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000'], // Replace with frontend origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials
}));

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Handles application/json
app.use(bodyParser.urlencoded({ extended: true })); // Handles URL-encoded bodies
// Connect to MongoDB using the function from config/db
connectDB(); 

// Alternatively, directly connect to MongoDB if not using a separate function
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/myofunctional_therapy_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/users', userRoutes); // Handle user-related requests
app.use('/api/auth', authRoutes); // Handle authentication-related requests
app.use('/api/appointments', appointmentRoutes); // Handle appointment-related requests
app.use('/api/therapists', therapistRoutes); // Add the therapists route here
app.use('/api/patients', patientRoutes); // Handle patient-related requests
app.use('/api/exercise', exerciseRoutes);
app.use('/api/forms', formRoutes); // Use the forms route
app.use('/api/incentives', incentiveRoutes); // Define incentive routes here
app.use('/api/library', libraryRoutes); // Define library routes here
app.use('/api/store', storeRoutes); // Handle store-related requests (products and orders)
app.use('/api/progress', progressRoutes); // Handle progress-related requests
app.use('/api/resources', resourcesRoutes); // Handle resource-related requests
app.use('/api/sleep-questionnaire', sleepQuestionnaireRoutes); // Add the sleep questionnaire routes
app.use('/api/hipaa', hipaaRoutes); 

// Basic root endpoint to confirm server is running
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
