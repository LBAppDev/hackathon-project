const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // For parsing JSON request bodies

// Connect to your MongoDB (or any database you're using)
mongoose.connect('mongodb://localhost:27017/schoolDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Database connection error:', err));

// Define the MissedSession schema and model
const MissedSessionSchema = new mongoose.Schema({
    teacherName: String,
    subjectName: String,
    className: String,
    date: String,
    startTime: String,
    endTime: String,
    reportedBy: String  // Can be the student's ID
});
const MissedSession = mongoose.model('MissedSession', MissedSessionSchema);

// API Route for reporting missed session
app.post('/api/report-missed-session', async (req, res) => {
    try {
        // Extract the data from the request body
        const { teacherName, subjectName, className, date, startTime, endTime, reportedBy } = req.body;

        // Create a new missed session document
        const newSession = new MissedSession({
            teacherName,
            subjectName,
            className,
            date,
            startTime,
            endTime,
            reportedBy
        });

        // Save it to the database
        await newSession.save();

        // Respond with success message
        res.status(200).json({ message: 'Session reported successfully' });
    } catch (error) {
        console.error('Error in reporting missed session:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
