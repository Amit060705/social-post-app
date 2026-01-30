import React, { useState } from 'react';
import {
    Box,
    TextField,
    InputAdornment,
    Paper,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Typography,
    Divider,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { userAPI } from '../../services/api';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);

    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);

        if (searchQuery.trim().length < 2) {
            setResults(null);
            return;
        }

        try {
            const data = await userAPI.search(searchQuery);
            setResults(data);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <Box sx={{ position: 'relative', mb: 3 }}>
            <TextField
                fullWidth
                placeholder="Search promotions, users, posts..."
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="primary" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 25,
                        bgcolor: '#f0f2f5',
                    },
                }}
            />

            {/* Search Results */}
            {results && (query.trim().length >= 2) && (
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        mt: 1,
                        maxHeight: '400px',
                        overflow: 'auto',
                        borderRadius: 2,
                    }}
                    elevation={3}
                >
                    {results.users?.length > 0 && (
                        <>
                            <Typography variant="subtitle2" sx={{ p: 2, pb: 0, color: 'text.secondary' }}>
                                Users
                            </Typography>
                            <List>
                                {results.users.map((user) => (
                                    <ListItem key={user._id} button>
                                        <ListItemAvatar>
                                            <Avatar src={user.profilePicture}>
                                                {user.username.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.username}
                                            secondary={user.bio}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}

                    {results.posts?.length > 0 && (
                        <>
                            <Divider />
                            <Typography variant="subtitle2" sx={{ p: 2, pb: 0, color: 'text.secondary' }}>
                                Posts
                            </Typography>
                            <List>
                                {results.posts.map((post) => (
                                    <ListItem key={post._id} button>
                                        <ListItemAvatar>
                                            <Avatar src={post.user?.profilePicture}>
                                                {post.user?.username?.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={post.user?.username}
                                            secondary={post.content?.substring(0, 60) + '...'}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </>
                    )}

                    {results.users?.length === 0 && results.posts?.length === 0 && (
                        <Typography variant="body2" color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>
                            No results found
                        </Typography>
                    )}
                </Paper>
            )}
        </Box>
    );
};

export default SearchBar;
