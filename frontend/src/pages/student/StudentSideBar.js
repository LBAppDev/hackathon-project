import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventBusyIcon from '@mui/icons-material/EventBusy';

const StudentSideBar = () => {
    const location = useLocation();

    const SidebarItem = ({ to, icon: Icon, label }) => (
        <ListItemButton component={Link} to={to}>
            <ListItemIcon>
                <Icon color={location.pathname.startsWith(to) ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );

    return (
        <>
            <SidebarItem to="/" icon={HomeIcon} label="Home" />
            <SidebarItem to="/Student/subjects" icon={AssignmentIcon} label="Subjects" />
            <SidebarItem to="/Student/attendance" icon={ClassOutlinedIcon} label="Attendance" />
            <SidebarItem to="/Student/complain" icon={AnnouncementOutlinedIcon} label="Complain" />
            <SidebarItem to="/Student/missed-sessions" icon={EventBusyIcon} label="Missed Sessions" />
            <SidebarItem to="/Student/take-attendance" icon={EventBusyIcon} label="Take Attendance" />
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>User</ListSubheader>
            <SidebarItem to="/Student/profile" icon={AccountCircleOutlinedIcon} label="Profile" />
            <SidebarItem to="/logout" icon={ExitToAppIcon} label="Logout" />
        </>
    );
};

export default StudentSideBar;
