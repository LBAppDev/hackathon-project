import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

const TeacherTakeAttendance = () => {
  const { currentUser } = useSelector((state) => state.user);
  const name = currentUser.teachSubject.subName;
  const classID = currentUser.teachSclass?._id;

  const [qrValue, setQrValue] = useState('');
  const [scannedId, setScannedId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [isAttendanceStarted, setIsAttendanceStarted] = useState(false);

  useEffect(() => {
    if (classID) {
      const fetchSubjects = async () => {
        try {
          const response = await axios.get(`/AllSubjects/${classID}`);
          setSubjects(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
          console.error("Failed to fetch subjects:", error);
        }
      };
      fetchSubjects();
    }
  }, [classID]);

  const handleSubjectChange = (event) => {
    const selectedSub = event.target.value;
    setSelectedSubject(selectedSub);
  };

  const startAttendance = async () => {
    const uniqueCode = `attendance-${new Date().getTime()}`;
    setQrValue(uniqueCode);

    try {
      const code = await axios.get(`/getSubCode/${name}`);
      await axios.post('/attendanceSessions', { code: uniqueCode, subCode: code.data.subCode });
      await axios.put(`/subjects/${code.data.subCode}/session`, { increment: 1 });

      if (Notification.permission === "granted") {
        new Notification("Attendance Started", {
          body: "Attendance has been successfully started, and session count updated.",
        });
      }
    } catch (error) {
      console.error("Error starting attendance:", error);
    }
  };

  const handleStartClick = () => {
    setIsAttendanceStarted(true);
  };

  const handleStopClick = () => {
    setIsAttendanceStarted(false);
    setQrValue(''); // Clear QR code when stopping attendance
    setCountdown(5); // Reset countdown
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    let interval;
    if (isAttendanceStarted) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            startAttendance();
            return 5;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      clearInterval(interval); // Clear interval when attendance stops
    }
  }, [isAttendanceStarted, name]);

  return (
    <CenteredWrapper>
      <Container>
        <Title>Teacher Dashboard</Title>
        <Button onClick={handleStartClick} disabled={isAttendanceStarted}>
          Start Taking Attendance
        </Button>
        <Button onClick={handleStopClick} disabled={!isAttendanceStarted} stop>
          Stop Taking Attendance
        </Button>

        {isAttendanceStarted && <CountdownDisplay>Next attendance in: {countdown} seconds</CountdownDisplay>}

        {qrValue && (
          <QRCodeContainer>
            <QRCodeCanvas value={qrValue} />
          </QRCodeContainer>
        )}
        {scannedId && <StudentID>Student ID: {scannedId}</StudentID>}
      </Container>
    </CenteredWrapper>
  );
};

export default TeacherTakeAttendance;

// Keyframes for QR code entrance animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const CenteredWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  background: linear-gradient(135deg, #f0f4f8, #e3f2fd); /* Background gradient for styling */
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #e3f2fd, #e0f7fa);
  border-radius: 12px;
  max-width: 500px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.15);
  gap: 15px; /* Add controlled spacing between children */
`;

const Title = styled.h2`
  font-size: 24px;
  color: #37474f;
  margin-bottom: 10px;
  font-weight: 600;
`;

const Button = styled.button`
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${({ stop }) => (stop ? '#ef5350' : '#42a5f5')};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${({ stop }) => (stop ? '#d32f2f' : '#1e88e5')};
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
  }
`;

const CountdownDisplay = styled.p`
  font-size: 18px;
  color: #00796b;
  font-weight: 500;
  padding: 10px 18px;
  border: 2px solid #00796b;
  border-radius: 8px;
  background-color: #e0f2f1;
`;

const QRCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  animation: ${fadeIn} 0.5s ease-out;
  margin: 10px 0; /* Reduced margin to limit extra space */
`;

const StudentID = styled.p`
  font-size: 16px;
  color: #37474f;
  font-weight: bold;
`;
