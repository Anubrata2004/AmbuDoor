const express = require('express');
const connectDB = require('./config/db');
const driverRoutes = require('./routes/driverRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors()); // To handle cross-origin requests

// Routes
app.use('/api', driverRoutes);
app.use('/api', userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
