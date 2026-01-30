import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    signup: async (formData) => {
        const response = await axios.post(`${API_URL}/auth/signup`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    login: async (credentials) => {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    },
};

// User API
export const userAPI = {
    getProfile: async (userId) => {
        const response = await api.get(`/user/profile/${userId}`);
        return response.data;
    },
    updateProfile: async (formData) => {
        const response = await api.put('/user/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    followUser: async (userId) => {
        const response = await api.post(`/user/follow/${userId}`);
        return response.data;
    },
    unfollowUser: async (userId) => {
        const response = await api.post(`/user/unfollow/${userId}`);
        return response.data;
    },
    search: async (query) => {
        const response = await api.get(`/user/search?q=${query}`);
        return response.data;
    },
};

// Post API
export const postAPI = {
    createPost: async (formData) => {
        const response = await api.post('/post/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
    getFeed: async (page = 1, limit = 20) => {
        const response = await api.get(`/post/feed?page=${page}&limit=${limit}`);
        return response.data;
    },
    getMostLiked: async (page = 1, limit = 20) => {
        const response = await api.get(`/post/feed/liked?page=${page}&limit=${limit}`);
        return response.data;
    },
    getMostCommented: async (page = 1, limit = 20) => {
        const response = await api.get(`/post/feed/commented?page=${page}&limit=${limit}`);
        return response.data;
    },
    getMostShared: async (page = 1, limit = 20) => {
        const response = await api.get(`/post/feed/shared?page=${page}&limit=${limit}`);
        return response.data;
    },
    likePost: async (postId) => {
        const response = await api.post(`/post/${postId}/like`);
        return response.data;
    },
    unlikePost: async (postId) => {
        const response = await api.post(`/post/${postId}/unlike`);
        return response.data;
    },
    commentOnPost: async (postId, text) => {
        const response = await api.post(`/post/${postId}/comment`, { text });
        return response.data;
    },
    sharePost: async (postId) => {
        const response = await api.post(`/post/${postId}/share`);
        return response.data;
    },
    deletePost: async (postId) => {
        const response = await api.delete(`/post/${postId}`);
        return response.data;
    },
};

export default api;
