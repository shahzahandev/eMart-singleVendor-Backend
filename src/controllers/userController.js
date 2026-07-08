const User = require('../models/emartUser');
const mongoose = require('mongoose');

exports.allUser = async (req, res) => {
    try {
        const users = await User.find({})
            .limit(10)
            .select("-password")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully.',
            users: users
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.singleUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID"
        });
    }

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.'
            });
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found.'
            });
        } else {
            return res.status(200).json({
                success: true,
                message: `User fetched successfully.`,
                user: {
                    email: user.email
                }
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID"
        });
    }

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required.'
            });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found with this id.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully.'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { email, phoneNumber } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID"
        });
    }

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required',
            });
        }

        const user = await User.findByIdAndUpdate(id, { email, phoneNumber }, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found with this id.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User information Updated successfully.',
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
}