import User from '../models/User.js';
import Post from '../models/Post.js';

// @desc    Get user profile
// @route   GET /api/user/profile/:userId
// @access  Public
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .select('-password')
            .populate('followers', 'username profilePicture')
            .populate('following', 'username profilePicture');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get user's posts
        const posts = await Post.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate('user', 'username profilePicture');

        res.json({
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePicture: user.profilePicture,
                bio: user.bio,
                followersCount: user.followers.length,
                followingCount: user.following.length,
                followers: user.followers,
                following: user.following,
            },
            posts,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/user/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.bio = req.body.bio || user.bio;

        if (req.file) {
            user.profilePicture = req.file.path;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            profilePicture: updatedUser.profilePicture,
            bio: updatedUser.bio,
            followersCount: updatedUser.followers.length,
            followingCount: updatedUser.following.length,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Follow a user
// @route   POST /api/user/follow/:userId
// @access  Private
export const followUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.userId);
        const currentUser = await User.findById(req.user._id);

        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (req.params.userId === req.user._id.toString()) {
            return res.status(400).json({ message: 'You cannot follow yourself' });
        }

        // Check if already following
        if (currentUser.following.includes(req.params.userId)) {
            return res.status(400).json({ message: 'Already following this user' });
        }

        // Add to following and followers
        currentUser.following.push(req.params.userId);
        userToFollow.followers.push(req.user._id);

        await currentUser.save();
        await userToFollow.save();

        res.json({ message: 'User followed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Unfollow a user
// @route   POST /api/user/unfollow/:userId
// @access  Private
export const unfollowUser = async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.userId);
        const currentUser = await User.findById(req.user._id);

        if (!userToUnfollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if following
        if (!currentUser.following.includes(req.params.userId)) {
            return res.status(400).json({ message: 'You are not following this user' });
        }

        // Remove from following and followers
        currentUser.following = currentUser.following.filter(
            id => id.toString() !== req.params.userId
        );
        userToUnfollow.followers = userToUnfollow.followers.filter(
            id => id.toString() !== req.user._id.toString()
        );

        await currentUser.save();
        await userToUnfollow.save();

        res.json({ message: 'User unfollowed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Search users and posts
// @route   GET /api/user/search?q=query
// @access  Public
export const search = async (req, res) => {
    try {
        const query = req.query.q;

        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        // Search users
        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { bio: { $regex: query, $options: 'i' } },
            ],
        })
            .select('-password')
            .limit(10);

        // Search posts
        const posts = await Post.find({
            content: { $regex: query, $options: 'i' },
        })
            .populate('user', 'username profilePicture')
            .sort({ createdAt: -1 })
            .limit(20);

        res.json({ users, posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
