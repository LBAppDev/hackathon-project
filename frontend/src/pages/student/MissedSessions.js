import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Box } from '@mui/material';
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
                // No studentId included here, as per your request
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
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                    <TextField label="Teacher Name" name="teacherName" value={form.teacherName} onChange={handleInputChange} />
                    <TextField label="Subject Name" name="subjectName" value={form.subjectName} onChange={handleInputChange} />
                    <TextField label="Class Name" name="className" value={form.className} onChange={handleInputChange} />
                    <TextField label="Date" name="date" type="date" value={form.date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <TextField label="Start Time" name="startTime" type="time" value={form.startTime} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <TextField label="End Time" name="endTime" type="time" value={form.endTime} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
                    <Button onClick={handleReportSession} variant="contained" color="primary">
                        Report Missed Session
                    </Button>
                </Box>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Teacher Name</TableCell>
                            <TableCell>Subject Name</TableCell>
                            <TableCell>Class Name</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Start Time</TableCell>
                            <TableCell>End Time</TableCell>
                            <TableCell>Recovered</TableCell>
                            {userRole === 'student' && <TableCell>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sessions.map((session) => (
                            <TableRow key={session._id}>
                                <TableCell>{session.teacherName}</TableCell>
                                <TableCell>{session.subjectName}</TableCell>
                                <TableCell>{session.className}</TableCell>
                                <TableCell>{new Date(session.date).toLocaleDateString()}</TableCell>
                                <TableCell>{session.startTime}</TableCell>
                                <TableCell>{session.endTime}</TableCell>
                                <TableCell>{session.isRecovered ? 'Yes' : 'No'}</TableCell>
                                {userRole === 'student' && !session.isRecovered && (
                                    <TableCell>
                                        <Button onClick={() => handleRecoverSession(session._id)} variant="contained" color="primary">
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