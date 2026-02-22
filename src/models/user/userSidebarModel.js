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

const userSidebarSchema = new Schema(
    {   
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

module.exports = mongoose.model("UserSidebar", userSidebarSchema);