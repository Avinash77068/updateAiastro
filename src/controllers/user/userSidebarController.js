const userSidebarModel = require("../../models/user/userSidebarModel");

const getUserSidebar = async (req, res) => {
    try {
        const data = await userSidebarModel.findOne();
        if (!data) {
            return res.status(404).json({ message: "No User Sidebar Data Found" });
        }
        res.status(200).json({
            success: true,
            data: {
                sidebarConfig: data.sidebarConfig
            },
            message: "User Sidebar Data Fetched Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


const createUserSidebar = async (req, res) => {
    try {
        const userSidebarData = new userSidebarModel({
            sidebarConfig: {
                showSidebar: true,
                sidebarItems: [
                    ...[
                    { "title": "Home", "icon": "home", "route": "/home", "order": 1 },
                    { "title": "Chat with Astrologer", "icon": "chat", "route": "/chat", "order": 2 },
                    { "title": "Call Astrologer", "icon": "phone", "route": "/call", "order": 3 },
                    { "title": "Video Consultation", "icon": "video", "route": "/video", "order": 4 },
                    { "title": "Free Kundli", "icon": "kundli", "route": "/kundli", "order": 5 },
                    { "title": "Horoscope", "icon": "horoscope", "route": "/horoscope", "order": 6 },
                    { "title": "My Wallet", "icon": "wallet", "route": "/wallet", "order": 7 },
                    { "title": "Recharge", "icon": "recharge", "route": "/recharge", "order": 8 },
                    { "title": "Offers", "icon": "offers", "route": "/offers", "order": 9 },
                    { "title": "History", "icon": "history", "route": "/history", "order": 10 },
                    { "title": "Favorite Astrologers", "icon": "star", "route": "/favorites", "order": 11 },
                    { "title": "Notifications", "icon": "bell", "route": "/notifications", "order": 12 },
                    { "title": "Refer & Earn", "icon": "gift", "route": "/refer", "order": 13 },
                    { "title": "Customer Support", "icon": "support", "route": "/support", "order": 14 },
                    { "title": "About Us", "icon": "info", "route": "/about", "order": 15 },
                    { "title": "Terms & Conditions", "icon": "terms", "route": "/terms", "order": 16 },
                    { "title": "Privacy Policy", "icon": "privacy", "route": "/privacy", "order": 17 },
                    { "title": "Settings", "icon": "settings", "route": "/settings", "order": 18 },
                    { "title": "Language", "icon": "language", "route": "/language", "order": 19 },
                    { "title": "Logout", "icon": "logout", "route": "/logout", "order": 20 }
                    ]
                ]
            }
        });
        await userSidebarData.save();
        res.status(201).json({ message: "User Sidebar Data Created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getUserSidebar, createUserSidebar };