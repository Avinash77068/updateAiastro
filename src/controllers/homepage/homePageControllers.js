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
                dasha: {
                    show: true,
                    route: "/dasha",
                    text: "dasha",
                    icon: "dasha",
                    logo: "https://astroguruvinodji.com/wp-content/uploads/2022/08/Top-astrologer-in-delhi.jpg",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
                transits: {
                    show: true,
                    route: "/transits",
                    text: "Transits",
                    icon: "transits",
                    logo: "https://astroguruvinodji.com/wp-content/uploads/2022/08/Top-astrologer-in-delhi.jpg",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
                liveAstrologer: {
                    show: true,
                    route: "/live-astrologer",
                    text: "Live Astrologer",
                    icon: "live-astrologer",
                    logo: "https://astroguruvinodji.com/wp-content/uploads/2022/08/Top-astrologer-in-delhi.jpg",
                    textColor: "#000000",
                    backgroundColor: "#ffffff",
                },
            },
            sidebarConfig: {
                showSidebar: true,
                sidebarItems: [
                    ...[
                        { "title": "Refer & Earn", "icon": "gift", "route": "/refer", "order": 1, "isclickable": true },
                        { "title": "Customer Support", "icon": "support", "route": "/support", "order": 2, "isclickable": true },
                        { "title": "About Us", "icon": "info", "route": "/about", "order": 3, "isclickable": true },
                        { "title": "Terms & Conditions", "icon": "terms", "route": "/terms", "order": 4, "isclickable": true },
                        { "title": "Privacy Policy", "icon": "privacy", "route": "/privacy", "order": 5, "isclickable": true },
                        { "title": "Settings", "icon": "settings", "route": "/settings", "order": 6, "isclickable": true },
                        { "title": "Language", "icon": "language", "route": "/language", "order": 7, "isclickable": true },
                        { "title": "Logout", "icon": "logout", "route": "/logout", "order": 8, "isclickable": true }
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