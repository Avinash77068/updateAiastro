const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
        trim: true,
        maxlength: [50, "Name cannot be more than 50 characters"]
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true, // Allows multiple null values, only enforces uniqueness on non-null values
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: [6, "Password must be at least 6 characters"],
        select: false // Don't include password in queries by default
    },
    phone: {
        type: String,
        required: false,
        unique: true,
        sparse: true, // Allows multiple null values, only enforces uniqueness on non-null values
        match: [/^[0-9]{10}$/, "Please add a valid 10-digit phone number"]
    },
    otp: {
        code: String,
        expiresAt: Date,
        attempts: {
            type: Number,
            default: 0,
            max: 3
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    lastLogin: {
        type: Date
    },
    dateOfBirth: {
        type: Date
    },
    place: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    chat: [{
        message: String,
        sender: String,
        astroResponse: String,
        astrologerId: String,
        timestamp: Date
    }]
}, {
    timestamps: true
});


// Sign JWT and return
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || "30d"
    });
};

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate OTP
userSchema.methods.generateOTP = function() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otp = {
        code: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        attempts: 0
    };
    return otp;
};

// Verify OTP
userSchema.methods.verifyOTP = function(enteredOTP) {
    if (!this.otp.code || !this.otp.expiresAt) {
        return false;
    }

    if (this.otp.attempts >= 3) {
        return false;
    }

    if (new Date() > this.otp.expiresAt) {
        return false;
    }

    if (this.otp.code !== enteredOTP) {
        this.otp.attempts += 1;
        return false;
    }

    // Clear OTP after successful verification
    this.otp = undefined;
    this.isVerified = true;
    this.lastLogin = new Date();

    return true;
};

module.exports = mongoose.model("User", userSchema);
