import React from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Home, Group, Notifications, AccountCircle } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getValueFromPath = (path) => {
        if (path === '/feed') return 0;
        if (path === '/profile') return 1;
        return 0;
    };

    return (
        <Paper
            sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { sm: 'none' } }}
            elevation={3}
        >
            <BottomNavigation
                value={getValueFromPath(location.pathname)}
                showLabels
                onChange={(event, newValue) => {
                    if (newValue === 0) navigate('/feed');
                    if (newValue === 1) navigate('/profile');
                }}
            >
                <BottomNavigationAction label="Home" icon={<Home />} />
                <BottomNavigationAction label="Social" icon={<Group />} />
                <BottomNavigationAction label="Notifications" icon={<Notifications />} />
                <BottomNavigationAction label="Profile" icon={<AccountCircle />} />
            </BottomNavigation>
        </Paper>
    );
};

export default BottomNav;
