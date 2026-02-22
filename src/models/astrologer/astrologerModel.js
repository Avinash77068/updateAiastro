const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const astrologerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: String,
    isLive: {
        type: Number,
        default: 0,
    },
    expertise: String,
    experience: String,
    price: String,
    status: {
        type: Number,
        default: 1,
    },
});

const astrologerModelSchema = new Schema(
    {
        astrologerList: [astrologerSchema],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Astrologer", astrologerModelSchema);
