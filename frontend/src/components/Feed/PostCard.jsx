import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Button,
    Box,
    TextField,
    Collapse,
    Divider,
} from '@mui/material';
import {
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    Share,
    MoreVert,
    Send,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { postAPI, userAPI } from '../../services/api';
import { formatDistanceToNow } from '../../utils/helpers';

const PostCard = ({ post, onUpdate }) => {
    const { user } = useAuth();
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isLiked, setIsLiked] = useState(
        post.likes?.some((like) => like.user === user?._id) || false
    );
    const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
    const [commentsCount, setCommentsCount] = useState(post.comments?.length || 0);
    const [sharesCount, setSharesCount] = useState(post.shares || 0);
    const [comments, setComments] = useState(post.comments || []);
    const [isFollowing, setIsFollowing] = useState(false);

    const isOwnPost = user?._id === post.user?._id;

    const handleLike = async () => {
        try {
            if (isLiked) {
                await postAPI.unlikePost(post._id);
                setIsLiked(false);
                setLikesCount(likesCount - 1);
            } else {
                await postAPI.likePost(post._id);
                setIsLiked(true);
                setLikesCount(likesCount + 1);
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        }
    };

    const handleComment = async () => {
        if (!commentText.trim()) return;

        try {
            const updatedPost = await postAPI.commentOnPost(post._id, commentText);
            setComments(updatedPost.comments);
            setCommentsCount(updatedPost.comments.length);
            setCommentText('');
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleShare = async () => {
        try {
            await postAPI.sharePost(post._id);
            setSharesCount(sharesCount + 1);
        } catch (error) {
            console.error('Error sharing post:', error);
        }
    };

    const handleFollow = async () => {
        try {
            if (isFollowing) {
                await userAPI.unfollowUser(post.user._id);
                setIsFollowing(false);
            } else {
                await userAPI.followUser(post.user._id);
                setIsFollowing(true);
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    };

    return (
        <Card sx={{ mb: 3, borderRadius: 2 }}>
            <CardHeader
                avatar={
                    <Avatar src={post.user?.profilePicture} alt={post.user?.username}>
                        {post.user?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                }
                action={
                    <Box>
                        {!isOwnPost && (
                            <Button
                                variant="contained"
                                size="small"
                                onClick={handleFollow}
                                sx={{ mr: 1, borderRadius: 20, textTransform: 'none' }}
                            >
                                {isFollowing ? 'Following' : 'Follow'}
                            </Button>
                        )}
                        <IconButton>
                            <MoreVert />
                        </IconButton>
                    </Box>
                }
                title={
                    <Typography variant="subtitle1" fontWeight="bold">
                        {post.user?.username}
                    </Typography>
                }
                subheader={
                    <Typography variant="caption" color="text.secondary">
                        {formatDistanceToNow(post.createdAt)}
                    </Typography>
                }
            />

            {post.content && (
                <CardContent sx={{ pt: 0 }}>
                    <Typography variant="body1">{post.content}</Typography>
                </CardContent>
            )}

            {post.image && (
                <Box>
                    <img
                        src={post.image}
                        alt="Post"
                        style={{
                            width: '100%',
                            maxHeight: '500px',
                            objectFit: 'cover',
                        }}
                    />
                </Box>
            )}

            <CardActions sx={{ px: 2, justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={handleLike} color={isLiked ? 'error' : 'default'}>
                            {isLiked ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <Typography variant="body2">{likesCount}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={() => setShowComments(!showComments)}>
                            <ChatBubbleOutline />
                        </IconButton>
                        <Typography variant="body2">{commentsCount}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton onClick={handleShare}>
                            <Share />
                        </IconButton>
                        <Typography variant="body2">{sharesCount}</Typography>
                    </Box>
                </Box>
            </CardActions>

            <Collapse in={showComments} timeout="auto" unmountOnExit>
                <Divider />
                <CardContent>
                    {/* Comments List */}
                    {comments.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                            {comments.map((comment, index) => (
                                <Box key={index} sx={{ mb: 2, display: 'flex', gap: 1 }}>
                                    <Avatar sx={{ width: 32, height: 32 }}>
                                        {comment.username?.charAt(0).toUpperCase()}
                                    </Avatar>
                                    <Box
                                        sx={{
                                            bgcolor: '#f0f2f5',
                                            borderRadius: 2,
                                            px: 2,
                                            py: 1,
                                            flex: 1,
                                        }}
                                    >
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {comment.username}
                                        </Typography>
                                        <Typography variant="body2">{comment.text}</Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {formatDistanceToNow(comment.createdAt)}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}

                    {/* Add Comment */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        <Avatar sx={{ width: 32, height: 32 }} src={user?.profilePicture}>
                            {user?.username?.charAt(0).toUpperCase()}
                        </Avatar>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Write a comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleComment();
                                }
                            }}
                        />
                        <IconButton
                            color="primary"
                            onClick={handleComment}
                            disabled={!commentText.trim()}
                        >
                            <Send />
                        </IconButton>
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PostCard;
