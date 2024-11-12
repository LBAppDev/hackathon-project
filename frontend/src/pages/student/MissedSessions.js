import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box, Typography } from '@mui/material';
import { CheckCircle, ReportProblem } from '@mui/icons-material';
import axios from 'axios';

const baseURL = 'http://localhost:5000/api';

const MissedSessions = ({ userRole }) => {
    const [sessions, setSessions] = useState([]);
    const [form, setForm] = useState({
        teacherName: '',
        subjectName: '',
        className: '',
        date: '',
        startTime: '',
        endTime: ''
    });

    useEffect(() => {
        fetchMissedSessions();
    }, []);

    // Fetch missed sessions from the server
    const fetchMissedSessions = async () => {
        try {
            const response = await axios.get('/missed-sessions');
            setSessions(response.data);
        } catch (error) {
            console.error('Error fetching missed sessions:', error);
        }
    };

    // Handle input changes for the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Report a missed session
    const handleReportSession = async () => {
        try {
            const reportData = {
                ...form,
            };
            const response = await axios.post('/report-missed-session', reportData);
            if (response.status === 200) {
                alert('Missed session reported successfully');
                fetchMissedSessions(); // Refresh the list
                setForm({
                    teacherName: '',
                    subjectName: '',
                    className: '',
                    date: '',
                    startTime: '',
                    endTime: ''
                });
            } else {
                alert('Failed to report missed session');
            }
        } catch (error) {
            console.error('Error reporting missed session:', error);
            alert('Error reporting missed session. Check the console for details.');
        }
    };

    // Mark a session as recovered
    const handleRecoverSession = async (sessionId) => {
        try {
            const response = await axios.post(`/recover-session/${sessionId}`);
            if (response.status === 200) {
                fetchMissedSessions(); // Refresh the list
            } else {
                alert('Failed to recover session');
            }
        } catch (error) {
            console.error('Error recovering session:', error);
        }
    };

    return (
        <>
            {userRole === 'student' && (
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4, p: 2, border: '1px solid #ddd', borderRadius: 2, backgroundColor: '#f9f9f9' }}>
                    <Typography variant="h6" color="primary" gutterBottom>Report a Missed Session</Typography>
                    <TextField size="small" label="Teacher Name" name="teacherName" value={form.teacherName} onChange={handleInputChange} />
                    <TextField size="small" label="Subject Name" name="subjectName" value={form.subjectName} onChange={handleInputChange} />
                    <TextField size="small" label="Class Name" name="className" value={form.className} onChange={handleInputChange} />
                    <TextField size="small" label="Date" name="date" type="date" value={form.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <TextField size="small" label="Start Time" name="startTime" type="time" value={form.startTime} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <TextField size="small" label="End Time" name="endTime" type="time" value={form.endTime} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <Button onClick={handleReportSession} variant="contained" color="secondary" startIcon={<ReportProblem />} sx={{ mt: 2 }}>
                        Report Missed Session
                    </Button>
                </Box>
            )}

            <Typography variant="h5" gutterBottom>Missed Sessions</Typography>
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#eceff1' }}>
                        <TableRow>
                            <TableCell><strong>Teacher Name</strong></TableCell>
                            <TableCell><strong>Subject Name</strong></TableCell>
                            <TableCell><strong>Class Name</strong></TableCell>
                            <TableCell><strong>Date</strong></TableCell>
                            <TableCell><strong>Start Time</strong></TableCell>
                            <TableCell><strong>End Time</strong></TableCell>
                            <TableCell><strong>Recovered</strong></TableCell>
                            {userRole === 'student' && <TableCell><strong>Actions</strong></TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessions.map((session) => (
                            <TableRow key={session._id} hover>
                                <TableCell>{session.teacherName}</TableCell>
                                <TableCell>{session.subjectName}</TableCell>
                                <TableCell>{session.className}</TableCell>
                                <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                                <TableCell>{session.startTime}</TableCell>
                                <TableCell>{session.endTime}</TableCell>
                                <TableCell>{session.isRecovered ? <CheckCircle color="success" /> : 'No'}</TableCell>
                                {userRole === 'student' && !session.isRecovered && (
                                    <TableCell>
                                        <Button onClick={() => handleRecoverSession(session._id)} variant="contained" color="success" sx={{ fontWeight: 'bold' }}>
                                            Mark as Recovered
                                        </Button>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default MissedSessions;
