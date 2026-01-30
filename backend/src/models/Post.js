import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        username: String,
        text: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    shares: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Custom validation: At least one of content or image must be present
postSchema.pre('save', function (next) {
    if (!this.content && !this.image) {
        next(new Error('Post must contain either text or image'));
    }
    next();
});

// Index for faster queries
postSchema.index({ createdAt: -1 });
postSchema.index({ user: 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
