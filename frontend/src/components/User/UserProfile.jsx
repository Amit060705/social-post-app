import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Avatar,
    Typography,
    Box,
    Button,
    Grid,
    CircularProgress,
    Tab,
    Tabs,
} from '@mui/material';
import { Edit, Person, Group } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { userAPI } from '../../services/api';
import PostCard from '../Feed/PostCard';

const UserProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const data = await userAPI.getProfile(user._id);
            setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
        setLoading(false);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', pb: 10 }}>
            <Container maxWidth="md" sx={{ pt: 4 }}>
                <Paper sx={{ p: 4, mb: 3, borderRadius: 3 }}>
                    {/* Profile Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Avatar
                            src={profile?.user?.profilePicture}
                            sx={{ width: 120, height: 120, mr: 3 }}
                        >
                            {profile?.user?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="h4" fontWeight="bold">
                                {profile?.user?.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                {profile?.user?.email}
                            </Typography>
                            {profile?.user?.bio && (
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {profile.user.bio}
                                </Typography>
                            )}
                            <Box sx={{ display: 'flex', gap: 3 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {profile?.posts?.length || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Posts
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {profile?.user?.followersCount || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Followers
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" fontWeight="bold">
                                        {profile?.user?.followingCount || 0}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Following
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Button
                            variant="outlined"
                            startIcon={<Edit />}
                            sx={{ borderRadius: 2, textTransform: 'none' }}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </Paper>

                {/* Tabs */}
                <Paper sx={{ mb: 3 }}>
                    <Tabs
                        value={activeTab}
                        onChange={(e, newValue) => setActiveTab(newValue)}
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab icon={<Person />} label="Posts" />
                        <Tab icon={<Group />} label="Followers" />
                        <Tab icon={<Group />} label="Following" />
                    </Tabs>
                </Paper>

                {/* Content */}
                {activeTab === 0 && (
                    <Box>
                        {profile?.posts?.length > 0 ? (
                            profile.posts.map((post) => <PostCard key={post._id} post={post} />)
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 8 }}>
                                <Typography variant="h6" color="text.secondary">
                                    No posts yet
                                </Typography>
                            </Box>
                        )}
                    </Box>
                )}

                {activeTab === 1 && (
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Followers ({profile?.user?.followersCount || 0})
                        </Typography>
                        {/* Display followers list here */}
                    </Paper>
                )}

                {activeTab === 2 && (
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Following ({profile?.user?.followingCount || 0})
                        </Typography>
                        {/* Display following list here */}
                    </Paper>
                )}
            </Container>
        </Box>
    );
};

export default UserProfile;
