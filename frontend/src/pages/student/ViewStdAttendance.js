import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Collapse, Container, Grid, IconButton, Typography, CircularProgress } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { calculateOverallAttendancePercentage, calculateSubjectAttendancePercentage, groupAttendanceBySubject } from '../../components/attendanceCalculator';

const ViewStdAttendance = () => {
    const dispatch = useDispatch();
    const { userDetails, currentUser, loading } = useSelector((state) => state.user);
    const [expandedSubjects, setExpandedSubjects] = useState({});
    const [subjectAttendance, setSubjectAttendance] = useState([]);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id]);

    useEffect(() => {
        if (userDetails) {
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const attendanceBySubject = groupAttendanceBySubject(subjectAttendance);
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);

    const toggleExpand = (subId) => {
        setExpandedSubjects((prev) => ({
            ...prev,
            [subId]: !prev[subId]
        }));
    };

    const renderSubjectCard = (subject, details) => {
        const { present, sessions, allData, subId } = details;
        const attendancePercentage = calculateSubjectAttendancePercentage(present, sessions);

        return (
            <Grid item xs={12} sm={6} md={4} key={subId}>
                <Card sx={{ height: '100%' }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {subject}
                        </Typography>
                        <Typography color="textSecondary">
                            Attendance: {attendancePercentage.toFixed(2)}% ({present}/{sessions} sessions)
                        </Typography>
                        <IconButton onClick={() => toggleExpand(subId)}>
                            {expandedSubjects[subId] ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                        <Collapse in={expandedSubjects[subId]} timeout="auto" unmountOnExit>
                            <Box mt={2}>
                                <Typography variant="subtitle2" gutterBottom>Details:</Typography>
                                {allData.map((data, index) => (
                                    <Typography variant="body2" key={index} color="textSecondary">
                                        {new Date(data.date).toLocaleDateString()} - {data.status}
                                    </Typography>
                                ))}
                            </Box>
                        </Collapse>
                    </CardContent>
                </Card>
            </Grid>
        );
    };

    return (
        <Container sx={{ mt: 4 }}>
            {loading ? (
                <CircularProgress color="secondary" />
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom>
                        Attendance Dashboard
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" gutterBottom>
                        Overall Attendance: {overallAttendancePercentage.toFixed(2)}%
                    </Typography>
                    <Grid container spacing={3}>
                        {Object.entries(attendanceBySubject).map(([subject, details]) =>
                            renderSubjectCard(subject, details)
                        )}
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default ViewStdAttendance;
