import User from '../models/user.js';

export const getUsers = async (req, res) => {
    try {
        // const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
        const users = await User.find({ role: { $ne: 'admin' }}).sort({ createdAt: -1 }).lean();
        const responseUsers = users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
        return res.status(200).json({ users: responseUsers });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

export default { getUsers };
