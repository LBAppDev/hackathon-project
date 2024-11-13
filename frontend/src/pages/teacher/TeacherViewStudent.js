import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Container,
  Grid,
  Typography,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  TableRow,
  TableCell,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';

const TeacherViewStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { currentUser, userDetails, loading } = useSelector((state) => state.user);

  const studentID = params.id;
  const teachSubject = currentUser.teachSubject?.subName;
  const teachSubjectID = currentUser.teachSubject?._id;

  const [openStates, setOpenStates] = useState({});
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [subjectMarks, setSubjectMarks] = useState([]);
  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

  useEffect(() => {
    dispatch(getUserDetails(studentID, 'Student'));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
      setSubjectMarks(userDetails.examResult || []);
    }
  }, [userDetails]);

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {loading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <>
          <Card variant="outlined" sx={{ mb: 4, p: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Student Information
              </Typography>
              <Typography>Name: {userDetails.name}</Typography>
              <Typography>Roll Number: {userDetails.rollNum}</Typography>
              <Typography>Class: {userDetails.sclassName?.sclassName}</Typography>
              <Typography>School: {userDetails.school?.schoolName}</Typography>
            </CardContent>
          </Card>

          <Grid container spacing={3}>
            {/* Attendance Section */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Attendance Overview</Typography>
                  <CustomPieChart
                    data={[
                      { name: 'Present', value: overallAttendancePercentage },
                      { name: 'Absent', value: 100 - overallAttendancePercentage },
                    ]}
                  />
                  <Typography align="center" sx={{ mt: 2 }}>
                    Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Attendance Details */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Subject-wise Attendance</Typography>
                  <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Subject</TableCell>
                          <TableCell>Present</TableCell>
                          <TableCell>Total Sessions</TableCell>
                          <TableCell>% Attendance</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(
                          ([subName, { present, allData, subId, sessions }]) => {
                            if (subName === teachSubject) {
                              const subjectAttendancePercentage = calculateSubjectAttendancePercentage(
                                present,
                                sessions
                              );

                              return (
                                <React.Fragment key={subId}>
                                  <TableRow>
                                    <TableCell>{subName}</TableCell>
                                    <TableCell>{present}</TableCell>
                                    <TableCell>{sessions}</TableCell>
                                    <TableCell>{subjectAttendancePercentage}%</TableCell>
                                    <TableCell>
                                      <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => handleOpen(subId)}
                                      >
                                        {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell colSpan={5} style={{ padding: 0 }}>
                                      <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                        <Box sx={{ p: 2 }}>
                                          <Typography variant="subtitle1" gutterBottom>
                                            Attendance Details
                                          </Typography>
                                          <Table size="small">
                                            <TableHead>
                                              <TableRow>
                                                <TableCell>Date</TableCell>
                                                <TableCell>Status</TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              {allData.map((data, idx) => (
                                                <TableRow key={idx}>
                                                  <TableCell>{new Date(data.date).toLocaleDateString()}</TableCell>
                                                  <TableCell>{data.status}</TableCell>
                                                </TableRow>
                                              ))}
                                            </TableBody>
                                          </Table>
                                        </Box>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              );
                            }
                            return null;
                          }
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Marks Section */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Subject Marks</Typography>
                  <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Subject</TableCell>
                          <TableCell>Marks Obtained</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {subjectMarks.map((result, idx) => {
                          if (result.subName?.subName === teachSubject) {
                            return (
                              <TableRow key={idx}>
                                <TableCell>{result.subName.subName}</TableCell>
                                <TableCell>{result.marksObtained}</TableCell>
                              </TableRow>
                            );
                          }
                          return null;
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)
              }
            >
              Add Attendance
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() =>
                navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)
              }
            >
              Add Marks
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default TeacherViewStudent;
