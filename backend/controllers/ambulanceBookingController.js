const AmbulanceBooking = require('../models/ambulanceBookingModel');

// Controller function to handle ambulance booking
exports.bookAmbulance = async (req, res) => {
    const { name, phone, pickupLocation } = req.body;

    // Basic validation
    if (!name || !phone || !pickupLocation) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    try {
        // Create a new booking instance
        const newBooking = new AmbulanceBooking({
            name,
            phone,
            pickupLocation
        });

        // Save to the database
        await newBooking.save();

        return res.status(201).json({
            success: true,
            message: 'Ambulance booked successfully'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later'
        });
    }
};
