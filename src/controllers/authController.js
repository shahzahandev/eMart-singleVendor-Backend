const User = require('../models/emartUser');
const bcrypt = require('bcrypt');
const { verifyEmail, resetEmailVerification } = require('../config/verifyEmail');
const { tokenGenaretor } = require('../config/tokenGenaraton');
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

        if (!email || !password || !confirmPassword || !terms) {
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

        // Genarate a token
        let token = tokenGenaretor(
            {
                user: user._id,
                user: user.email
            },
            process.env.JWT_SECRET_KEY,
            process.env.JWT_ACCESS_TOKEN_EXPIRY
        )
        // Send mail Verification
        verifyEmail(token, email);

        return res.status(201).json({
            success: true,
            message: `User created successfully`
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: 'No Account found with this email address.'
            });
        }

        let pass = bcrypt.compareSync(password, existingUser.password);

        if (!pass) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Email and Password.',
            });
        } else {
            return res.status(200).json({
                success: true,
                message: 'Wellcome back, Login successfully.',
                user: {
                    userId: existingUser._id,
                    userEmail: existingUser.email
                }
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No Account found with this email address.'
            });
        }

        // Genarate a token
        let token = tokenGenaretor(
            {
                user: user._id,
                user: user.email
            },
            process.env.JWT_SECRET_KEY,
            process.env.JWT_ACCESS_TOKEN_EXPIRY
        );

        resetEmailVerification(token, email);

        return res.status(200).json({
            success: true,
            message: 'Check your email and Set Password.',
            user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.resetPassword = async (req, res) => {

    let { newPassword, confirmPassword } = req.body;
    let { token } = req.params;

    try {
        if (!newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required.'
            });
        }

        if (newPassword != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: `Password don't match.`
            })
        }

        // verify a token 
        jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Unauthorized.'
                });
            } else {
                console.log(decoded.data.user)

                const hash = bcrypt.hashSync(newPassword, 10);

                const user = await User.findOne({ email: decoded.data.user })
                user.password = hash
                await user.save()
                return res.status(200).json({
                    success: true,
                    message: 'Password Upadated successfully.'
                })
            }
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.resendEmailVerification = async (req, res) => {
    let { email } = req.body;

    try {
        let user = await User.findOne({ email: email });

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email is required.'
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'No account found with this email address.'
            });
        }
        // Genarate a token
        let token = tokenGenaretor(
            {
                user: user._id,
                user: user.email
            },
            process.env.JWT_SECRET_KEY,
            process.env.JWT_ACCESS_TOKEN_EXPIRY
        )

        verifyEmail(token, email);

        return res.status(200).json({
            success: true,
            message: 'Verify your email.'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.verifyEmailCheck = async (req, res) => {
    let { token } = req.params;

    try {

        // verify a token 
        jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: 'Unauthorized.'
                });
            } else {
                const userId = decoded.data.user;
                const user = await User.findOne({email : userId});

                if (user.isVerified) {
                    return res.status(400).json({
                        success: false,
                        message: 'Email already verified.'
                    });
                } else {
                    user.isVerified = true
                    await user.save();

                    return res.status(200).json({
                        success: true,
                        message: 'Email verified successfully.',
                        user
                    });
                }
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}