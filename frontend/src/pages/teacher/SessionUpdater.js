import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const SessionUpdater = () => {
    const [subjectId, setSubjectId] = useState('');
    const [sessionCount, setSessionCount] = useState(0);

    const handleUpdate = async () => {
        try {
            await axios.put(`/subjects/${subjectId}/session`, { current_session: sessionCount });
            alert("Session count updated successfully!");
        } catch (error) {
            console.error('Error updating session:', error.response?.data || error.message);
            alert("Failed to update session.");
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <TextField
                label="Subject ID"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
            />
            <TextField
                label="Current Session"
                type="number"
                value={sessionCount}
                onChange={(e) => setSessionCount(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Session
            </Button>
        </Box>
    );
};

export default SessionUpdater;
