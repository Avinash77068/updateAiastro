const homePageModel = require("../../models/homepage/homePageModel");

const getHomePageData = async (req, res) => {
    try {
        const data = await homePageModel.findOne();
        if (!data) {
            return res.status(404).json({ message: "No Home Page Data Found" });
        }
        res.status(200).json({
            success: true,
            data: {
                appConfig: data.appConfig,
                gridConfig: data.gridConfig,
                sidebarConfig: data.sidebarConfig
            },
            message: "Home Page Data Fetched Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


const createHomePageData = async (req, res) => {
    try {
        const homePageData = new homePageModel({
            appConfig: {
                appName: "Astro Logger",
                appDescription: "Talk to verified astrologers anytime, anywhere.",
                logo: "https://astroguruvinodji.com/wp-content/uploads/2022/08/Top-astrologer-in-delhi.jpg",
                favicon: "https://astroguruvinodji.com/wp-content/uploads/2022/08/Top-astrologer-in-delhi.jpg",
                showFreeChatButton: {
                    show: true,
                    buttonText: "Free Chat",
                    buttonIcon: "chat",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",

                },
                showPremiumChatButton: {
                    show: true,
                    buttonText: "Premium Chat",
                    buttonIcon: "chat",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
                showCallButton: {
                    show: true,
                    buttonText: "Call",
                    buttonIcon: "call",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
                showVideoButton: {
                    show: true,
                    buttonText: "Video",
                    buttonIcon: "video",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
                showVideoButton: {
                    show: true,
                    buttonText: "Video",
                    buttonIcon: "video",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },

            },
            gridConfig: {
                showKundliButton: {
                    show: true,
                    route: "/kundli",
                    text: "Kundli",
                    icon: "kundli",
                    logo: "https://astroguruvinodji.com/wp-content/uploads/2022/08/Top-astrologer-in-delhi.jpg",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
                showZodiacSigns: {
                    show: true,
                    route: "/zodiac-signs",
                    text: "Zodiac Signs",
                    icon: "zodiac",
                    logo: "https://astroguruvinodji.com/wp-content/uploads/2022/08/Top-astrologer-in-delhi.jpg",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
                horoscope: {
                    show: true,
                    route: "/horoscope",
                    text: "Horoscope",
                    icon: "horoscope",
                    logo: "https://astroguruvinodji.com/wp-content/uploads/2022/08/Top-astrologer-in-delhi.jpg",    
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
            },
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
        await homePageData.save();
        res.status(201).json({ message: "Home Page Data Created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getHomePageData, createHomePageData };