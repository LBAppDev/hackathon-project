import React, { useState } from 'react';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Tooltip, Typography } from '@mui/material';
import { Settings, Logout } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const { currentRole, currentUser } = useSelector(state => state.user);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={styles.avatar}>
                            {String(currentUser.name).charAt(0)}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 8,
                    sx: styles.styledPaper,
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem sx={styles.menuItem}>
                    <Avatar sx={styles.menuAvatar} />
                    <Box sx={{ ml: 1 }}>
                        <Typography variant="body1" sx={styles.profileName}>{currentUser.name}</Typography>
                        <Typography variant="caption" sx={styles.profileRole}>{currentRole}</Typography>
                    </Box>
                </MenuItem>
                <Divider sx={{ my: 1, borderColor: '#ddd' }} />
                <MenuItem onClick={handleClose} sx={styles.menuItem}>
                    <ListItemIcon>
                        <Settings sx={styles.icon} />
                    </ListItemIcon>
                    <Typography variant="body1" sx={styles.menuText}>Settings</Typography>
                </MenuItem>
                <MenuItem onClick={handleClose} sx={styles.menuItem}>
                    <ListItemIcon>
                        <Logout sx={styles.icon} />
                    </ListItemIcon>
                    <Link to="/logout" style={styles.link}>
                        <Typography variant="body1" sx={styles.menuText}>Logout</Typography>
                    </Link>
                </MenuItem>
            </Menu>
        </>
    );
};

export default AccountMenu;

const styles = {
    avatar: {
        width: 40,
        height: 40,
        bgcolor: 'linear-gradient(135deg, #6A1B9A, #AB47BC)',
        color: '#fff',
        fontSize: '1.2rem',
    },
    styledPaper: {
        background: 'linear-gradient(135deg, #f3f3f3, #e7e7e7)',
        overflow: 'visible',
        filter: 'drop-shadow(0px 6px 12px rgba(0,0,0,0.15))',
        mt: 1.5,
        borderRadius: '10px',
        '& .MuiAvatar-root': {
            width: 34,
            height: 34,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 12,
            height: 12,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
    menuAvatar: {
        width: 30,
        height: 30,
        bgcolor: '#ddd',
    },
    profileName: {
        fontWeight: 600,
        color: '#333',
    },
    profileRole: {
        fontSize: '0.8rem',
        color: '#999',
    },
    menuItem: {
        '&:hover': {
            bgcolor: '#f3e5f5', // Light purple for hover effect
        },
    },
    menuText: {
        fontWeight: 500,
        color: '#444',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        color: 'rgba(0, 0, 0, 0.54)',
        transition: 'color 0.3s',
        '&:hover': {
            color: '#8E24AA', // Dark purple color on hover
        },
    },
};
