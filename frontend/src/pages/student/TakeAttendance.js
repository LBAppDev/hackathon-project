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
  padding: 30px;
  background: linear-gradient(135deg, #ece9e6, #ffffff);
  border-radius: 15px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  margin: 50px auto;
`;

const Title = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 15px;
  font-family: 'Poppins', sans-serif;
`;

const Instruction = styled.p`
  font-size: 16px;
  color: #34495e;
  margin-bottom: 25px;
  text-align: center;
  font-family: 'Roboto', sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 450px;
  margin-bottom: 25px;
`;

const StyledInput = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 2px solid #bdc3c7;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fdfdfd;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const StyledButton = styled.button`
  padding: 12px;
  font-size: 18px;
  background-color: #2980b9;
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: #1f618d;
    transform: translateY(-3px);
  }
`;

const QRCodeContainer = styled.div`
  width: 320px;
  height: 320px;
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #3498db;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const SuccessMessage = styled.div`
  color: #27ae60;
  font-weight: bold;
  text-align: center;
  padding: 12px;
  border: 2px solid #27ae60;
  border-radius: 10px;
  background-color: #eafaf1;
  font-family: 'Roboto', sans-serif;
`;
