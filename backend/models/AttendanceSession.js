// models/AttendanceSession.js
const mongoose = require('mongoose');

const attendanceSessionSchema = new mongoose.Schema({
  code: { type: String, required: true },
  subCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '1h' } // Session expires after 1 hour
});

module.exports = mongoose.model('AttendanceSession', attendanceSessionSchema);
