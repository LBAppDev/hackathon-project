import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';  // Import useSelector

const TeacherTakeAttendance = () => {
  // Access currentUser from Redux store to get classID
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser.teachSubject.subName);
  const name = currentUser.teachSubject.subName;
  const classID = currentUser.teachSclass?._id
  const [qrValue, setQrValue] = useState('');
  const [scannedId, setScannedId] = useState('');
  const [subCode, setSubCode] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');

  // Fetch subjects based on classID
  useEffect(() => {
    if (classID) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(`/AllSubjects/${classID}`);
          console.log('Fetched subjects:', response.data); // Log the fetched subjects
          setSubjects(Array.isArray(response.data) ? response.data : []); // Ensure it's an array
        } catch (error) {
          console.error("Failed to fetch subjects:", error);
        }
      };
      fetchSubjects();
    }
  }, [classID]); // Dependency array ensures it runs when classID changes

  const handleSubjectChange = (event) => {
    const selectedSub = event.target.value;
    setSelectedSubject(selectedSub);

    const subject = subjects.find((sub) => sub.name === selectedSub);
    setSubCode(subject ? subject.code : '');
  };

  const startAttendance = async () => {
    const uniqueCode = `attendance-${new Date().getTime()}`;
    setQrValue(uniqueCode);
    
    const code = await axios.get(`/getSubCode/${name}`);
    console.log(code.data.subCode);
    try {
      await axios.post('/attendanceSessions', { code: uniqueCode, subCode: code.data.subCode });
      await axios.put(`/subjects/${code.data.subCode}/session`, { increment: 1 });

      alert("Attendance started, and session count updated!");
    } catch (error) {
      console.error("Error starting attendance:", error);
      alert("Failed to start attendance or update session count.");
    }
  };

  const handleScan = (data) => {
    if (data) setScannedId(data);
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Container>
      <Title>Teacher Dashboard</Title>
      
      <Button onClick={startAttendance} >Start Taking Attendance</Button>

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
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Select = styled.select`
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
  width: 300px;
  height: 300px;
`;

const StudentID = styled.p`
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
`;
