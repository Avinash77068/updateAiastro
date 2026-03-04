const User = require("../../models/user/userModel");
const bcrypt = require("bcryptjs");

// @desc    Register user
// @route   POST /user/signup
// @access  Public
const signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Validation
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { phone }]
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: existingUser.email === email.toLowerCase()
                    ? "Email already registered"
                    : "Phone number already registered"
            });
        }

        // Create user with hashed password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            phone
        });

        // Generate token
        const token = user.getSignedJwtToken();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isVerified: user.isVerified,
                    role: user.role
                },
                token
            }
        });

    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server error during signup"
        });
    }
};

// @desc    Login user
// @route   POST /user/login
// @access  Public
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }

        // Check for user
        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Generate token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isVerified: user.isVerified,
                    role: user.role,
                    lastLogin: user.lastLogin
                },
                token
            }
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server error during login"
        });
    }
};

// @desc    Send OTP for phone login
// @route   POST /user/send-otp
// @access  Public
const sendOTP = async (req, res) => {
    try {
        const { phone } = req.body;

        // Validation
        if (!phone) {
            return res.status(400).json({
                success: false,
                message: "Please provide phone number"
            });
        }

        // Validate phone format (10 digits)
        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid 10-digit phone number"
            });
        }

        // Check if user exists
        let user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Phone number not registered. Please sign up first."
            });
        }

        // Generate OTP
        const otp = user.generateOTP();
        await user.save();

        // TODO: Send OTP via SMS service (Twilio, etc.)
        console.log(`OTP for ${phone}: ${otp}`); // For development only

        res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            data: {
                phone,
                otpExpiresIn: 600, // 10 minutes in seconds,
                otp
            }
        });

    } catch (error) {
        console.error("Send OTP error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server error sending OTP"
        });
    }
};

// @desc    Verify OTP and login
// @route   POST /user/verify-otp
// @access  Public
const verifyOTP = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        // Validation
        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                message: "Please provide phone number and OTP"
            });
        }

        // Find user
        const user = await User.findOne({ phone });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Verify OTP
        const isValidOTP = user.verifyOTP(otp);

        if (!isValidOTP) {
            await user.save(); // Save failed attempt count
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP"
            });
        }

        // Save successful verification
        await user.save();

        // Generate token
        const token = user.getSignedJwtToken();

        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isVerified: user.isVerified,
                    role: user.role,
                    lastLogin: user.lastLogin
                },
                token
            }
        });

    } catch (error) {
        console.error("Verify OTP error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server error verifying OTP"
        });
    }
};

// @desc    Get current user profile
// @route   GET /user/profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isVerified: user.isVerified,
                    role: user.role,
                    lastLogin: user.lastLogin,
                    createdAt: user.createdAt
                }
            }
        });

    } catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server error getting profile"
        });
    }
};

// @access  Private
const updateProfile = async (req, res) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        };

        // Remove undefined fields
        Object.keys(fieldsToUpdate).forEach(key =>
            fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
        );

        const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    isVerified: user.isVerified,
                    role: user.role
                }
            }
        });

    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Server error updating profile"
        });
    }
};

module.exports = {
    signup,
    login,
    sendOTP,
    verifyOTP,
    getProfile,
    updateProfile
};