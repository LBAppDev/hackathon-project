import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Html5QrcodeScanner } from 'html5-qrcode';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';


const StudentDashboard = () => {
  const [scanResult, setScanResult] = useState(null);
  const [studentID, setStudentID] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [manualID, setManualID] = useState('');

  const params = useParams(); // Use student ID from params if available

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 5, useStream: true, qrbox: { width: 250, height: 250 } }, false);
    
    scanner.render(success, error);
    
    function success(result) {
      scanner.clear();
      setScanResult(result);
      const studentID = manualID || params.id; // Use manually entered ID or from params
      alert(studentID);
      fetch('/api/verifyAttendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scannedCode: result, studentID })
      })
      .then(response => response.json())
      .then(data => {
        if (data.verified) {
          alert('Attendance marked as present!');
        } else {
          alert('Invalid code. Please try again.');
        }
      })
      .catch(error => console.error('Error:', error));
    }
    
    function error(err) {
      console.warn(err);
    }
  }, [manualID, params.id]); // Update when manual ID or params ID change

  const handleSubmit = async () => {
    if (studentID && sessionID) {
      try {
        
        const response = await axios.post('/verifyAttendance', {
          sessionID,
          studentID
        });
        if (response.data.verified) {
          alert('Attendance marked as present!');
        } else {
          alert('Invalid session code. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Please enter both student ID and session ID.');
    }
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Scan the Teacher's QR Code to mark your attendance</p>
      <div>
        <input 
          type="text" 
          placeholder="Enter your Student ID" 
          value={studentID} 
          onChange={(e) => setStudentID(e.target.value)} 
        />
      </div>
      <div>
        <input 
          type="text" 
          placeholder="Enter the session ID" 
          value={sessionID} 
          onChange={(e) => setSessionID(e.target.value)} 
        />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div style={{ width: '300px', height: '300px' }}>
        {scanResult
          ? <div>success: {scanResult}</div>
          : <div id="reader"></div>
        }
      </div>
    </div>
  );
};

export default StudentDashboard;
