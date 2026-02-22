

const astrologerModel = require("../../models/astrologer/astrologerModel");

const getAstrologerData = async (req, res) => {
    try {
        const data = await astrologerModel.findOne();
        if (!data) {
            return res.status(404).json({ message: "No Astrologer Data Found" });
        }
        res.status(200).json({
            success: true,
            data: {
                astrologerList: data.astrologerList
            },
            message: "Astrologer Data Fetched Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


const createAstrologerData = async (req, res) => {
    try {
        const astrologerData = new astrologerModel({
            astrologerList: [
                {
                    name: 'Dhyani Singh',
                    image: 'https://randomuser.me/api/portraits/women/3.jpg',
                    isLive: 1,
                    expertise: 'Numerology • Palmistry',
                    experience: '5 yrs exp',
                    price: '18',
                    status: 3,
                }
            ]
        });
        await astrologerData.save();
        res.status(201).json({ message: "Astrologer Data Created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { getAstrologerData, createAstrologerData };