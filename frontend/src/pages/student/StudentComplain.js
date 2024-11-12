import { useEffect, useState } from 'react';
import { Box, CircularProgress, Stack, TextField, Typography, Tooltip } from '@mui/material';
import Popup from '../../components/Popup';
import { BlueButton } from '../../components/buttonStyles';
import { addStuff } from '../../redux/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';

const StudentComplain = () => {
    const [complaint, setComplaint] = useState("");
    const [date, setDate] = useState("");

    const dispatch = useDispatch();
    const { status, currentUser, error } = useSelector((state) => state.user);

    const user = currentUser._id;
    const school = currentUser.school._id;
    const address = "Complain";

    const [loader, setLoader] = useState(false);
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = { user, date, complaint, school };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(addStuff(fields, address));
    };

    useEffect(() => {
        if (status === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Complaint added successfully!");
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("Network Error. Please try again.");
        }
    }, [status, error]);

    return (
        <>
            <Box
                sx={{
                    flex: '1 1 auto',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    backgroundColor: '#f4f6f8',
                }}
            >
                <Box
                    sx={{
                        maxWidth: 550,
                        px: 4,
                        py: 6,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: 3,
                        width: '100%',
                    }}
                >
                    <Stack spacing={2} sx={{ mb: 4 }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            Submit a Complaint
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center">
                            We’re here to help. Share your concern below.
                        </Typography>
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            <TextField
                                fullWidth
                                label="Select Date"
                                type="date"
                                value={date}
                                onChange={(event) => setDate(event.target.value)}
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                label="Write your complaint"
                                placeholder="Describe your issue or concern"
                                variant="outlined"
                                value={complaint}
                                onChange={(event) => setComplaint(event.target.value)}
                                required
                                multiline
                                rows={4}
                            />
                        </Stack>
                        <Tooltip title="Submit your complaint">
                            <BlueButton
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                variant="contained"
                                type="submit"
                                disabled={loader}
                            >
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                            </BlueButton>
                        </Tooltip>
                    </form>
                </Box>
            </Box>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default StudentComplain;
