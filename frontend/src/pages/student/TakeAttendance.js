import React, { useState, useEffect } from 'react';
import QRScanner from 'react-qr-scanner';
import { Html5QrcodeScanner } from 'html5-qrcode';


const StudentDashboard = ({ teacherCode }) => {
  const [scanResult, setScanResult] = useState(null);
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader",
      { fps: 5, useStream: true, qrbox: { width: 250, height: 250 } }, false
     );
   
   scanner.render(success, error);
 
   function success(result) {
     // Handle on success condition with the decoded text or result.
     scanner.clear();
     setScanResult(result);
   }
 
   function error(err) {
     console.warn(err);
   }
  }, []);

  

  return (
    <div>
      <h2>Student Dashboard</h2>
      <p>Scan the Teacher's QR Code to mark your attendance</p>
      <div style={{ width: '300px', height: '300px' }}>
        {scanResult
        ?<div>success: {scanResult}</div>
        :<div id="reader"></div>
        }
      </div>
      
    </div>
  );
};

export default StudentDashboard;
