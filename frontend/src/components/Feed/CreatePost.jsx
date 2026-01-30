import React, { useState } from 'react';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Box,
    IconButton,
    Typography,
    Avatar,
} from '@mui/material';
import { PhotoCamera, EmojiEmotions, Close } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { postAPI } from '../../services/api';

const CreatePost = ({ onPostCreated }) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = async () => {
        if (!content.trim() && !image) {
            setError('Post must contain either text or image');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        if (content.trim()) {
            formData.append('content', content);
        }
        if (image) {
            formData.append('image', image);
        }

        try {
            const newPost = await postAPI.createPost(formData);
            setContent('');
            setImage(null);
            setPreview(null);
            if (onPostCreated) {
                onPostCreated(newPost);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create post');
        }

        setLoading(false);
    };

    return (
        <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Avatar
                        src={user?.profilePicture}
                        alt={user?.username}
                        sx={{ width: 48, height: 48 }}
                    >
                        {user?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="What's on your mind?"
                            variant="outlined"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            sx={{ mb: 2 }}
                        />

                        {preview && (
                            <Box sx={{ position: 'relative', mb: 2 }}>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        maxHeight: '300px',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                    }}
                                />
                                <IconButton
                                    onClick={removeImage}
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        bgcolor: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                                    }}
                                    size="small"
                                >
                                    <Close />
                                </IconButton>
                            </Box>
                        )}

                        {error && (
                            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                                {error}
                            </Typography>
                        )}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box>
                                <IconButton color="primary" component="label">
                                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                                    <PhotoCamera />
                                </IconButton>
                                <IconButton color="primary">
                                    <EmojiEmotions />
                                </IconButton>
                            </Box>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={loading || (!content.trim() && !image)}
                                sx={{ borderRadius: 2, textTransform: 'none', px: 4 }}
                            >
                                {loading ? 'Posting...' : 'Post'}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CreatePost;
