import React, { useState, useEffect } from 'react';
import { Container, Box, CircularProgress, Typography, Button } from '@mui/material';
import { postAPI } from '../../services/api';
import CreatePost from './CreatePost';
import PostCard from './PostCard';
import FilterTabs from './FilterTabs';
import SearchBar from './SearchBar';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPosts = async (tabIndex = 0, pageNum = 1) => {
        setLoading(true);
        try {
            let data;
            switch (tabIndex) {
                case 1:
                    data = await postAPI.getMostLiked(pageNum);
                    break;
                case 2:
                    data = await postAPI.getMostCommented(pageNum);
                    break;
                case 3:
                    data = await postAPI.getMostShared(pageNum);
                    break;
                default:
                    data = await postAPI.getFeed(pageNum);
            }

            if (pageNum === 1) {
                setPosts(data.posts);
            } else {
                setPosts([...posts, ...data.posts]);
            }

            setHasMore(data.currentPage < data.totalPages);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPosts(activeTab, 1);
        setPage(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTab]);

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(activeTab, nextPage);
    };

    return (
        <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh', pb: 10 }}>
            <Container maxWidth="md" sx={{ pt: 4 }}>
                <SearchBar />
                <CreatePost onPostCreated={handlePostCreated} />
                <FilterTabs activeTab={activeTab} onTabChange={handleTabChange} />

                {loading && page === 1 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : posts.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <Typography variant="h6" color="text.secondary">
                            No posts yet. Be the first to post!
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {posts.map((post) => (
                            <PostCard key={post._id} post={post} />
                        ))}

                        {hasMore && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                <Button
                                    variant="outlined"
                                    onClick={loadMore}
                                    disabled={loading}
                                    sx={{ borderRadius: 20, textTransform: 'none', px: 4 }}
                                >
                                    {loading ? 'Loading...' : 'Load More'}
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </Box>
    );
};

export default Feed;
