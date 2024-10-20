const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ambulanceNumber: { type: String, required: true },
    hospitalName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    carDetails: { type: String, required: true },
    password: { type: String, required: true } 
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
