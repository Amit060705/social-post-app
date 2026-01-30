import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { Readable } from 'stream';

// Configure memory storage for Multer
const storage = multer.memoryStorage();

// File filter to accept only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image file.'), false);
    }
};

// Base multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
    },
});

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (buffer, folder) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: folder,
                resource_type: 'auto',
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );

        const readableStream = Readable.from(buffer);
        readableStream.pipe(uploadStream);
    });
};

// Middleware for post image uploads
export const uploadPost = upload.single('image');

// Middleware for profile picture uploads
export const uploadProfile = upload.single('profilePicture');

// Middleware to handle Cloudinary upload after multer
export const handleCloudinaryUpload = (folder) => async (req, res, next) => {
    try {
        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer, folder);
            req.file.path = result.secure_url;
            req.file.cloudinaryId = result.public_id;
        }
        next();
    } catch (error) {
        next(error);
    }
};
