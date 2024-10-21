const AmbulanceBooking = require('../models/ambulanceBookingModel');

exports.bookAmbulance = async (req, res) => {
    const { name, phone, pickupLocation, dropLocation } = req.body; // Include dropLocation

    // Basic validation
    if (!name || !phone || !pickupLocation || !dropLocation) {
        return res.status(400).json({
            success: false,
            message: 'All fields (Name, Phone, Pickup Location, Drop Location) are required'
        });
    }

    try {
        // Create a new booking instance
        const newBooking = new AmbulanceBooking({
            name,
            phone,
            pickupLocation,
            dropLocation // Include dropLocation in the booking
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
// Controller function to fetch the latest booking info
exports.getLatestPickupInfo = async (req, res) => {
    try {
        // Find the most recent booking
        const latestBooking = await AmbulanceBooking.findOne().sort({ createdAt: -1 });

        // If no bookings are found, return an error
        if (!latestBooking) {
            return res.status(404).json({
                success: false,
                message: 'No bookings found'
            });
        }

        // Return the latest booking's pickup location and phone number
        return res.status(200).json({
            success: true,
            pickupLocation: latestBooking.pickupLocation,
            phoneNumber: latestBooking.phone
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later'
        });
    }
};
