

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
                    id: '1',
                    name: 'Dhyani Singh',
                    image: 'https://randomuser.me/api/portraits/women/3.jpg',
                    isLive: 1,
                    expertise: 'Numerology • Palmistry',
                    experience: '5 yrs exp',
                    price: '18',
                    status: 3,
                },
                {
                    id: '2',
                    name: 'Rubhika Sharma',
                    image: 'https://randomuser.me/api/portraits/women/2.jpg',
                    isLive: 1,
                    expertise: 'Numerology • Palmistry',
                    experience: '5 yrs exp',
                    price: '18',
                    status: 1,
                },
                {
                    id: '3',
                    name: 'Dhyani Singh',
                    image: 'https://randomuser.me/api/portraits/women/3.jpg',
                    isLive: 1,
                    expertise: 'Numerology • Palmistry',
                    experience: '5 yrs exp',
                    price: '18',
                    status: 2,
                },
                {
                    id: '4',
                    name: 'Ayush Srivastav',
                    image: 'https://randomuser.me/api/portraits/men/4.jpg',
                    isLive: 1,
                    expertise: 'Numerology • Palmistry',
                    experience: '5 yrs exp',
                    price: '18',
                    status: 2,
                },
                {
                    id: '5',
                    name: 'Rubhika Sharma',
                    image: 'https://randomuser.me/api/portraits/women/2.jpg',
                    isLive: 1,
                    expertise: 'Numerology • Palmistry',
                    experience: '5 yrs exp',
                    price: '18',
                    status: 3,
                },
                {
                    id: '6',
                    name: 'Dhyani Singh',
                    image: 'https://randomuser.me/api/portraits/women/3.jpg',
                    isLive: 1,
                    expertise: 'Numerology • Palmistry',
                    experience: '5 yrs exp',
                    price: '18',
                    status: 3,
                },
                {
                    id: '7',
                    name: 'Ayush Kumar',
                    image: 'https://randomuser.me/api/portraits/men/4.jpg',
                    isLive: 1,
                    expertise: 'Numerology • Palmistry',
                    experience: '5 yrs exp',
                    price: '18',
                    status: 2,
                },
                {
                    id: '8',
                    name: 'Ayush Kumar',
                    image: 'https://randomuser.me/api/portraits/men/4.jpg',
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