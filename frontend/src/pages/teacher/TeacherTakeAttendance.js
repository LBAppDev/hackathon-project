import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Import QRCodeCanvas
import QRScanner from 'react-qr-scanner';
import axios from 'axios';
import styled from 'styled-components';

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
    <Container>
      <Title>Teacher Dashboard</Title>
      <Button onClick={startAttendance}>Start Taking Attendance</Button>
      <Input
        type="text"
        placeholder="Enter Subject Code"
        value={subCode}
        onChange={(e) => setSubCode(e.target.value)}
      />
      {qrValue && (
        <QRCodeContainer>
          <QRCodeCanvas value={qrValue} />
        </QRCodeContainer>
      )}
      
      {scannedId && <StudentID>Student ID: {scannedId}</StudentID>}
    </Container>
  );
};

export default TeacherTakeAttendance;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 80%;
  max-width: 400px;
  margin-top: 20px;
  box-sizing: border-box;
`;

const QRCodeContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 300px;
`;

const ScannerContainer = styled.div`
  width: 300px;
  height: 300px;
  margin-top: 20px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StudentID = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;
