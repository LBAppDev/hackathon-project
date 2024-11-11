import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import styled from 'styled-components';
import axios from 'axios';

const StudentDashboard = () => {
  const [scanResult, setScanResult] = useState(null);
  const [studentID, setStudentID] = useState('');
  const [sessionID, setSessionID] = useState('');
  const [manualID, setManualID] = useState('');

  const params = useParams();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 5, useStream: true, qrbox: { width: 250, height: 250 } },
      false
    );
    
    scanner.render(handleScanSuccess, handleScanError);
    
    function handleScanSuccess(result) {
      scanner.clear();
      setScanResult(result);
      const studentID = manualID || params.id;
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
    
    function handleScanError(err) {
      console.warn(err);
    }
  }, [manualID, params.id]);

  const handleSubmit = async () => {
    if (studentID && sessionID) {
      try {
        const response = await axios.post('/verifyAttendance', { sessionID, studentID });
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
    <DashboardContainer>
      <Title>Student Dashboard</Title>
      <Instruction>Scan the Teacher's QR Code to mark your attendance</Instruction>
      <InputContainer>
        <StyledInput
          type="text"
          placeholder="Enter your Student ID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
        />
        <StyledInput
          type="text"
          placeholder="Enter the Session ID"
          value={sessionID}
          onChange={(e) => setSessionID(e.target.value)}
        />
        <StyledButton onClick={handleSubmit}>Submit</StyledButton>
      </InputContainer>
      <QRCodeContainer>
        {scanResult ? (
          <SuccessMessage>Success: {scanResult}</SuccessMessage>
        ) : (
          <div id="reader"></div>
        )}
      </QRCodeContainer>
    </DashboardContainer>
  );
};

export default StudentDashboard;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
`;

const Instruction = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  text-align: center;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;

const QRCodeContainer = styled.div`
  width: 300px;
  height: 300px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border: 1px solid #4caf50;
  border-radius: 5px;
  background-color: #e8f5e9;
`;
