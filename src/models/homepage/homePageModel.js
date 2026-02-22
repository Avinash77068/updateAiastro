const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sidebarItemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    icon: String,
    route: String,
    order: Number,
    isActive: {
        type: Boolean,
        default: true,
    },
});

const homePageSchema = new Schema(
    {
        appConfig: {
            appName: String,
            appDescription: String,
            logo: String,
            favicon: String,
            showFreeChatButton: Boolean,
            showPremiumChatButton: Boolean,
            showCallButton: Boolean,
            showVideoButton: Boolean,
        },

        sidebarConfig: {
            showSidebar: {
                type: Boolean,
                default: true,
            },
            sidebarItems: [sidebarItemSchema],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("HomePage", homePageSchema);