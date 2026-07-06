const User = require('../models/emartUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {

    const { email, password, confirmPassword, terms } = req.body

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already existed.'
            });
        }

        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (terms == false) {
            return res.status(400).json({
                success: false,
                message: 'Please accept our terms and conditions'
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: `Password don't match, Write the same password`
            });
        }
        // Password hash
        const hashPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = new User({
            email: email,
            password: hashPassword,
            terms: terms
        });
        await user.save();

        // token
        let token = jwt.sign({
            user: user._id,
            userMail: user.email
        }, process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
        )

        return res.status(201).json({
            success: true,
            message: `User created successfully`,
            token: token
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}