import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black' }} elevation={1}>
            <Toolbar>
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ flexGrow: 1, fontWeight: 'bold', color: '#1976d2' }}
                >
                    Social
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {user?.username}
                    </Typography>
                    <IconButton onClick={handleLogout}>
                        <Avatar src={user?.profilePicture} sx={{ width: 40, height: 40 }}>
                            {user?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
