const mongoose = require('mongoose');

// Ambulance Booking Schema
const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the Booking model
module.exports = mongoose.model('AmbulanceBooking', bookingSchema);
