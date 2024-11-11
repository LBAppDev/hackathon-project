import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas
import QRScanner from 'react-qr-scanner';
import axios from 'axios';

const TeacherTakeAttendance = () => {
  const [qrValue, setQrValue] = useState(''); // State for QR value
  const [scannedId, setScannedId] = useState(''); // State for scanned ID
  const [subCode, setSubCode] = useState(''); // State for subject code

  const startAttendance = () => {
    const uniqueCode = `attendance-${new Date().getTime()}`; // Generate a unique code
    setQrValue(uniqueCode); // Set QR code value
    // Save the code and subject code to the server
    axios.post('/attendanceSessions', { code: uniqueCode, subCode: subCode });
  };

  const handleScan = (data) => {
    if (data) {
      setScannedId(data); // Set scanned ID
    }
  };

  const handleError = (err) => {
    console.error(err); // Log any errors from QRScanner
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Teacher Dashboard</h2>
      <button onClick={startAttendance}>Start Taking Attendance</button>
      <input 
        type="text" 
        placeholder="Enter Subject Code" 
        value={subCode} 
        onChange={(e) => setSubCode(e.target.value)} 
      />
      {qrValue && <QRCodeCanvas value={qrValue} />}
      <div style={{ width: '300px', height: '300px' }}></div>
      {scannedId && <p>Student ID: {scannedId}</p>} {/* Display student ID only after sending */}
    </div>
  );
};

export default TeacherTakeAttendance;
