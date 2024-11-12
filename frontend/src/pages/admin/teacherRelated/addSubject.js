import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { addSubject } from '../../../redux/sclassRelated/sclassHandle'; // Assuming addSubject is a defined action
import { useNavigate } from 'react-router-dom';

const AddSubject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [subjectName, setSubjectName] = useState('');
    const [subjectCode, setSubjectCode] = useState('');
    const { loading, error } = useSelector((state) => state.sclass);

    const handleAddSubject = () => {
        dispatch(addSubject({ subName: subjectName, subCode: subjectCode }));
        navigate("/Admin/subjects");
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6">Add a New Subject</Typography>
            <TextField
                label="Subject Name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Subject Code"
                value={subjectCode}
                onChange={(e) => setSubjectCode(e.target.value)}
                fullWidth
                margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddSubject} 
                disabled={loading || !subjectName || !subjectCode}
            >
                {loading ? 'Adding...' : 'Add Subject'}
            </Button>
        </Box>
    );
};

export default AddSubject;
