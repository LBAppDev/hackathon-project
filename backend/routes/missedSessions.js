// routes/missedSessions.js
const express = require('express');
const router = express.Router();

// Assuming you have a MissedSession model
const MissedSession = require('../models/MissedSession');

// Get all missed sessions
router.get('/missed-sessions', async (req, res) => {
    try {
        const sessions = await MissedSession.find();  // Replace with your DB query logic
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching missed sessions' });
    }
});

// Report a missed session
router.post('/report-missed-session', async (req, res) => {
    const { teacherName, subjectName, className, date, startTime, endTime} = req.body;
    try {
        const newSession = new MissedSession({
            teacherName,
            subjectName,
            className,
            date,
            startTime,
            endTime,
            isRecovered: false,
        });

        const savedSession = await newSession.save();
        res.status(200).json(savedSession);
    } catch (err) {
        res.status(500).json({ message: 'Error reporting missed session' });
    }
});

// Mark a session as recovered
router.post('/recover-session/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    try {
        const session = await MissedSession.findById(sessionId);
        if (!session) {
            return res.status(404).json({ message: 'Session not found' });
        }

        session.isRecovered = true;
        await session.save();
        res.status(200).json(session);
    } catch (err) {
        res.status(500).json({ message: 'Error recovering session' });
    }
});

module.exports = router;
