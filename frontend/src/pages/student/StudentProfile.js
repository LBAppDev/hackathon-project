import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts';
import { useSpring, animated } from 'react-spring';
import Skeleton from '@mui/material/Skeleton';

const COLORS = ['#0088FE', '#FF8042'];
const dataSample = [
  { name: 'Assignment 1', score: 75 },
  { name: 'Assignment 2', score: 89 },
  { name: 'Assignment 3', score: 92 }
];

const StudentHomePage = () => {
  const dispatch = useDispatch();
  const { userDetails, currentUser, loading, response } = useSelector(state => state.user);
  const { subjectsList } = useSelector(state => state.sclass);
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const classID = currentUser?.sclassName?._id;
  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: 100 - overallAttendancePercentage }
  ];

  useEffect(() => {
    dispatch(getUserDetails(currentUser._id, "Student"));
    dispatch(getSubjectList(classID, "ClassSubjects"));
    setTimeout(() => setLoadingData(false), 2000); // Simulating loading
  }, [dispatch, currentUser._id, classID]);

  useEffect(() => {
    setSubjectAttendance(userDetails?.attendance || []);
  }, [userDetails]);

  const springProps = useSpring({
    opacity: loadingData ? 0 : 1,
    transform: loadingData ? 'scale(0.9)' : 'scale(1)'
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <StyledPaper>
            <Typography variant="h6">Overall Attendance</Typography>
            {loadingData ? (
              <Skeleton variant="rectangular" height={100} />
            ) : (
              <PieChart width={150} height={150}>
                <Pie data={chartData} dataKey="value" outerRadius={60} fill="#8884d8">
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
          </StyledPaper>
        </Grid>
        
        <Grid item xs={12} sm={6} md={8}>
          <StyledPaper>
            <Typography variant="h6">Assignment Scores</Typography>
            {loadingData ? (
              <Skeleton variant="rectangular" height={150} />
            ) : (
              <BarChart width={300} height={150} data={dataSample}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#0088FE" />
              </BarChart>
            )}
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <DynamicHeightPaper>
            <animated.div style={springProps}>
              <SeeNotice />
            </animated.div>
          </DynamicHeightPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const DynamicHeightPaper = styled(Paper)`
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
`;

export default StudentHomePage;
