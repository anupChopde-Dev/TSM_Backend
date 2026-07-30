import User from '../models/user.js';

export const getUsers = async (req, res) => {
    try {
        // const users = await User.find().select('-password').sort({ createdAt: -1 }).lean();
        const users = await User.find({ role: { $ne: 'admin' }}).sort({ createdAt: -1 }).lean();
        const responseUsers = users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            isBlock: user.isBlock,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }));
        return res.status(200).json({ users: responseUsers });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

export const updateUserBlock = async (req, res) => {
    try {
        const { id } = req.params;
        const { isBlock } = req.body;

        if (typeof isBlock !== 'boolean') {
            return res.status(400).json({ message: 'Invalid isBlock value. It must be a boolean.' });
        }

        const updatedUser = await User.findByIdAndUpdate(id,{ isBlock },{ new: true, runValidators: true }).lean();

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            message: `User ${isBlock ? 'blocked' : 'unblocked'} successfully`,
            // user: {
            //     id: updatedUser._id,
            //     username: updatedUser.username,
            //     email: updatedUser.email,
            //     role: updatedUser.role,
            //     isBlock: updatedUser.isBlock,
            //     createdAt: updatedUser.createdAt,
            //     updatedAt: updatedUser.updatedAt,
            // },
        });
    } catch (error) {
        console.error('Error updating user block status:', error);
        res.status(500).json({ message: 'Failed to update user block status' });
    }
};

export default { getUsers, updateUserBlock };
