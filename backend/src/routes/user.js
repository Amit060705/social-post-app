import express from 'express';
import {
    getUserProfile,
    updateUserProfile,
    followUser,
    unfollowUser,
    search,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { uploadProfile, handleCloudinaryUpload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/profile/:userId', getUserProfile);
router.get('/search', search);

// Protected routes
router.put('/profile', protect, uploadProfile, handleCloudinaryUpload('social-profiles'), updateUserProfile);
router.post('/follow/:userId', protect, followUser);
router.post('/unfollow/:userId', protect, unfollowUser);

export default router;
