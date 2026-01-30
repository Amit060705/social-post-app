import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { uploadProfile, handleCloudinaryUpload } from '../middleware/upload.js';

const router = express.Router();

// Signup route with optional profile picture upload
router.post('/signup', uploadProfile, handleCloudinaryUpload('social-profiles'), signup);

// Login route
router.post('/login', login);

export default router;
