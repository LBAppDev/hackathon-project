// /server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import the routes
const missedSessionsRoutes = require('./routes/missedSessions');

// Initialize the app
const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse incoming request bodies as JSON

// Database connection (MongoDB)
mongoose.connect('mongodb://localhost:27017/missed_sessions_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Error connecting to MongoDB:', err));

// Set up the routes
app.use('/api', missedSessionsRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
