const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    sendOTP,
    verifyOTP,
    getProfile,
    updateProfile,
    chatResponse
} = require("../../controllers/user/userController");

// Import auth middleware if it exists
let protect;
try {
    const { protect: authProtect } = require("../../middleware/auth");
    protect = authProtect;
} catch (error) {
    // Create basic auth middleware if it doesn't exist
    protect = (req, res, next) => {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }
        next();
    };
}

// Public routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/chat", chatResponse)

// Protected routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;