// models/MissedSession.js
const mongoose = require('mongoose');

const missedSessionSchema = new mongoose.Schema({
    teacherName: { type: String, required: true },
    subjectName: { type: String, required: true },
    className: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true }, 
    isRecovered: { type: Boolean, default: false }
});

const MissedSession = mongoose.model('MissedSession', missedSessionSchema);

module.exports = MissedSession;
