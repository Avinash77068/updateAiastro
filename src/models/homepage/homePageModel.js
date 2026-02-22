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
            showFreeChatButton: {
                show: Boolean,
                buttonText: String,
                buttonIcon: String,
                textColor: String,
                backgroundColor: String,

            },
            showPremiumChatButton: {
                show: Boolean,
                buttonText: String,
                buttonIcon: String,
                textColor: String,
                backgroundColor: String,
            },
            showCallButton: {
                show: Boolean,
                buttonText: String,
                buttonIcon: String,
                textColor: String,
                backgroundColor: String,
            },
            showVideoButton: {
                show: Boolean,
                buttonText: String,
                buttonIcon: String,
                textColor: String,
                backgroundColor: String,
            },
            
        },
        gridConfig: {
            showKundliButton:{
                show: Boolean,
                route: String,
                text: String,
                icon: String,
                logo: String,
                textColor: String,
                backgroundColor: String,
            },
            showZodiacSigns:{
                show: Boolean,
                route: String,
                text: String,
                icon: String,
                logo: String,
                textColor: String,
                backgroundColor: String,
            },
            horoscope:{
                show: Boolean,
                route: String,
                text: String,
                icon: String,
                logo: String,
                textColor: String,
                backgroundColor: String,
            },
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