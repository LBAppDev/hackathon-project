import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import bgpic from "../assets/designlogin.png";
import styled from 'styled-components';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const theme = createTheme({
    palette: {
        primary: {
            main: '#007bff',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
        h4: {
            fontWeight: 700,
            color: '#333',
        },
        body1: {
            color: '#555',
        },
    },
});

const LoginPage = ({ role }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, currentUser, response, error, currentRole } = useSelector(state => state.user);

    const [toggle, setToggle] = useState(false);
    const [guestLoader, setGuestLoader] = useState(false);
    const [loader, setLoader] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [rollNumberError, setRollNumberError] = useState(false);
    const [studentNameError, setStudentNameError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const password = event.target.password.value;

        if (role === "Student") {
            const rollNum = event.target.rollNumber.value;
            const studentName = event.target.studentName.value;

            if (!rollNum || !studentName || !password) {
                if (!rollNum) setRollNumberError(true);
                if (!studentName) setStudentNameError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { rollNum, studentName, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        } else {
            const email = event.target.email.value;

            if (!email || !password) {
                if (!email) setEmailError(true);
                if (!password) setPasswordError(true);
                return;
            }

            const fields = { email, password };
            setLoader(true);
            dispatch(loginUser(fields, role));
        }
    };

    const guestModeHandler = () => {
        const password = "zxc";
        const fields = role === "Student" 
            ? { rollNum: "1", studentName: "Dipesh Awasthi", password }
            : { email: role === "Admin" ? "yogendra@12" : "tony@12", password };
        
        setGuestLoader(true);
        dispatch(loginUser(fields, role));
    };

    useEffect(() => {
        if (status === 'success' || currentUser) {
            const dashboardPath = `/${currentRole}/dashboard`;
            navigate(dashboardPath);
        } else if (status === 'failed' || status === 'error') {
            setMessage(status === 'error' ? "Network Error" : response);
            setShowPopup(true);
            setLoader(false);
            setGuestLoader(false);
        }
    }, [status, currentRole, navigate, response, currentUser]);

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh', background: 'linear-gradient(135deg, #f0f4f8, #d9e8ff)' }}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: 400, p: 4 }}>
                        <Typography variant="h4" align="center" gutterBottom>
                            {role} Login
                        </Typography>
                        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                            Welcome back! Please enter your details.
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
                            {role === "Student" ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="rollNumber"
                                        label="Enter your Roll Number"
                                        name="rollNumber"
                                        type="number"
                                        error={rollNumberError}
                                        helperText={rollNumberError && 'Roll Number is required'}
                                        onChange={() => setRollNumberError(false)}
                                    />
                                    <TextField
                                        margin="normal"
                                        fullWidth
                                        id="studentName"
                                        label="Enter your name"
                                        name="studentName"
                                        error={studentNameError}
                                        helperText={studentNameError && 'Name is required'}
                                        onChange={() => setStudentNameError(false)}
                                    />
                                </>
                            ) : (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="email"
                                    label="Enter your email"
                                    name="email"
                                    error={emailError}
                                    helperText={emailError && 'Email is required'}
                                    onChange={() => setEmailError(false)}
                                />
                            )}
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type={toggle ? 'text' : 'password'}
                                id="password"
                                error={passwordError}
                                helperText={passwordError && 'Password is required'}
                                onChange={() => setPasswordError(false)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => setToggle(!toggle)}>
                                                {toggle ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Grid container justifyContent="space-between" sx={{ mt: 1 }}>
                                <FormControlLabel
                                    control={<Checkbox color="primary" />}
                                    label="Remember me"
                                />
                                <StyledLink to="#" style={{ color: '#007bff', fontSize: '0.9rem' }}>
                                    Forgot password?
                                </StyledLink>
                            </Grid>
                            <PrimaryButton type="submit" variant="outlined" fullWidth sx={{ mt: 2, borderColor: '#007bff' }}>
                                {loader ? <CircularProgress size={24} color="inherit" /> : "Login"}
                            </PrimaryButton>
                            <Button
                                fullWidth
                                onClick={guestModeHandler}
                                variant="outlined"
                                sx={{ mt: 2, color: '#007bff' }}
                            >
                                {guestLoader ? <CircularProgress size={24} color="primary" /> : "Login as Guest"}
                            </Button>
                            {role === "Admin" && (
                                <Grid container justifyContent="center" sx={{ mt: 3 }}>
                                    <Typography variant="body2" sx={{ mr: 1 }}>
                                        Don’t have an account?
                                    </Typography>
                                    <StyledLink to="/Adminregister">
                                        Sign up
                                    </StyledLink>
                                </Grid>
                            )}
                        </Box>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${bgpic})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
            <Backdrop open={guestLoader} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </ThemeProvider>
    );
}

export default LoginPage;

const StyledLink = styled(Link)`
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
`;

const PrimaryButton = styled(Button)`
    background-color: #007bff;
    color: #fff;
    &:hover {
        background-color: #0056b3;
    }
`;
