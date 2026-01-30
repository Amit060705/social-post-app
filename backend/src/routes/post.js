import express from 'express';
import {
    createPost,
    getFeed,
    getMostLiked,
    getMostCommented,
    getMostShared,
    likePost,
    unlikePost,
    commentOnPost,
    sharePost,
    deletePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import { uploadPost, handleCloudinaryUpload } from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/feed', getFeed);
router.get('/feed/liked', getMostLiked);
router.get('/feed/commented', getMostCommented);
router.get('/feed/shared', getMostShared);

// Protected routes
router.post('/create', protect, uploadPost, handleCloudinaryUpload('social-posts'), createPost);
router.post('/:postId/like', protect, likePost);
router.post('/:postId/unlike', protect, unlikePost);
router.post('/:postId/comment', protect, commentOnPost);
router.post('/:postId/share', protect, sharePost);
router.delete('/:postId', protect, deletePost);

export default router;
