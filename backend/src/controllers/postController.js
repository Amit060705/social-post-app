import Post from '../models/Post.js';
import User from '../models/User.js';

// @desc    Create a new post
// @route   POST /api/post/create
// @access  Private
export const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const image = req.file ? req.file.path : '';

        // Validate that at least one field is present
        if (!content && !image) {
            return res.status(400).json({ message: 'Post must contain either text or image' });
        }

        const post = await Post.create({
            user: req.user._id,
            content,
            image,
        });

        const populatedPost = await Post.findById(post._id).populate('user', 'username profilePicture');

        res.status(201).json(populatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get all posts (public feed)
// @route   GET /api/post/feed
// @access  Public
export const getFeed = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate('user', 'username profilePicture')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Post.countDocuments();

        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get most liked posts
// @route   GET /api/post/feed/liked
// @access  Public
export const getMostLiked = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const posts = await Post.aggregate([
            {
                $addFields: {
                    likesCount: { $size: '$likes' }
                }
            },
            { $sort: { likesCount: -1, createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
        ]);

        // Populate user data
        await Post.populate(posts, { path: 'user', select: 'username profilePicture' });

        const total = await Post.countDocuments();

        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get most commented posts
// @route   GET /api/post/feed/commented
// @access  Public
export const getMostCommented = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const posts = await Post.aggregate([
            {
                $addFields: {
                    commentsCount: { $size: '$comments' }
                }
            },
            { $sort: { commentsCount: -1, createdAt: -1 } },
            { $skip: skip },
            { $limit: limit }
        ]);

        // Populate user data
        await Post.populate(posts, { path: 'user', select: 'username profilePicture' });

        const total = await Post.countDocuments();

        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get most shared posts
// @route   GET /api/post/feed/shared
// @access  Public
export const getMostShared = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .populate('user', 'username profilePicture')
            .sort({ shares: -1, createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Post.countDocuments();

        res.json({
            posts,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalPosts: total,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Like a post
// @route   POST /api/post/:postId/like
// @access  Private
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if already liked
        const alreadyLiked = post.likes.some(
            like => like.user.toString() === req.user._id.toString()
        );

        if (alreadyLiked) {
            return res.status(400).json({ message: 'Post already liked' });
        }

        post.likes.push({
            user: req.user._id,
            username: req.user.username,
        });

        await post.save();

        const updatedPost = await Post.findById(post._id).populate('user', 'username profilePicture');

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Unlike a post
// @route   POST /api/post/:postId/unlike
// @access  Private
export const unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if liked
        const likeIndex = post.likes.findIndex(
            like => like.user.toString() === req.user._id.toString()
        );

        if (likeIndex === -1) {
            return res.status(400).json({ message: 'Post not liked yet' });
        }

        post.likes.splice(likeIndex, 1);

        await post.save();

        const updatedPost = await Post.findById(post._id).populate('user', 'username profilePicture');

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Comment on a post
// @route   POST /api/post/:postId/comment
// @access  Private
export const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push({
            user: req.user._id,
            username: req.user.username,
            text,
        });

        await post.save();

        const updatedPost = await Post.findById(post._id).populate('user', 'username profilePicture');

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Share a post (increment share count)
// @route   POST /api/post/:postId/share
// @access  Private
export const sharePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.shares += 1;

        await post.save();

        const updatedPost = await Post.findById(post._id).populate('user', 'username profilePicture');

        res.json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a post
// @route   DELETE /api/post/:postId
// @access  Private
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user owns the post
        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await post.deleteOne();

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
