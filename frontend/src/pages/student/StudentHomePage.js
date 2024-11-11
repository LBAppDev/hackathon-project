import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import styled from 'styled-components';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import SubjectIcon from "../../assets/subjects.svg";
import AssignmentIcon from "../../assets/assignment.svg";
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';

const StudentHomePage = () => {
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading, response } = useSelector(state => state.user);
    const { subjectsList } = useSelector(state => state.sclass);
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    const classID = currentUser.sclassName._id;
    const numberOfSubjects = subjectsList?.length || 0;
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
        dispatch(getSubjectList(classID, "ClassSubjects"));
    }, [dispatch, currentUser._id, classID]);

    useEffect(() => {
        setSubjectAttendance(userDetails?.attendance || []);
    }, [userDetails]);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <img src={SubjectIcon} alt="Subjects" />
                        <Title>Total Subjects</Title>
                        <Data start={0} end={numberOfSubjects} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <img src={AssignmentIcon} alt="Assignments" />
                        <Title>Total Assignments</Title>
                        <Data start={0} end={15} duration={4} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledPaper>
                        <Typography variant="h6">Progress</Typography> {/* Added title for the pie chart */}
                        {response ? (
                            <Typography variant="h6">No Attendance Found</Typography>
                        ) : (
                            loading ? (
                                <Typography variant="h6">Loading...</Typography>
                            ) : (
                                subjectAttendance?.length > 0 ? (
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <CustomPieChart data={chartData} />
                                    </div>
                                ) : (
                                    <Typography variant="h6">No Attendance Found</Typography>
                                )
                            )
                        )}
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <DynamicHeightPaper>
                        <SeeNotice />
                    </DynamicHeightPaper>
                </Grid>
            </Grid>
        </Container>
    );
}

const baseContainerStyle = `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledPaper = styled(Paper)`
  ${baseContainerStyle}
  padding: 16px;
  height: 200px;
  box-sizing: border-box;
`;

const DynamicHeightPaper = styled(Paper)`
  ${baseContainerStyle}
  padding: 16px;
  box-sizing: border-box;
  height: auto; /* Makes the notice table card height dynamic */
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default StudentHomePage;
