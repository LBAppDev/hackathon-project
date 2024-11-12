import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography } from '@mui/material';
import { addClass } from '../../../redux/sclassRelated/sclassHandle'; // Assuming addClass is a defined action
import { useNavigate } from 'react-router-dom';

const AddClass = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [className, setClassName] = useState('');
    const { loading, error } = useSelector((state) => state.sclass);

    const handleAddClass = () => {
        dispatch(addClass({ sclassName: className }));
        navigate("/Admin/classes");
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6">Add a New Class</Typography>
            <TextField
                label="Class Name"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                fullWidth
                margin="normal"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddClass} 
                disabled={loading || !className}
            >
                {loading ? 'Adding...' : 'Add Class'}
            </Button>
        </Box>
    );
};

export default AddClass;
