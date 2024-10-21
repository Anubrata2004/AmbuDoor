const bcrypt = require('bcrypt');
const Driver = require('../models/driver');
const ApiResponse = require('../helpers/ApiResponse');
const jwt = require('jsonwebtoken');

// Driver Signup Controller
exports.driverSignup = async (req, res) => {
    const { name, ambulanceNumber, hospitalName, phoneNumber, carDetails, password } = req.body;

    try {
        // Check if driver already exists
        const existingDriver = await Driver.findOne({ phoneNumber });
        if (existingDriver) {
            return res.status(400).json(ApiResponse(false, 'Driver already exists with this phone number.'));
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new driver
        const newDriver = new Driver({
            name,
            ambulanceNumber,
            hospitalName,
            phoneNumber,
            carDetails,
            password: hashedPassword
        });

        await newDriver.save();
        return res.status(201).json(ApiResponse(true, 'Signup successful!', { driverId: newDriver._id }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(ApiResponse(false, 'Server error, please try again.'));
    }
};

// Driver Login Controller
exports.driverLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const existingDriver = await Driver.findOne({ phoneNumber });
        if (!existingDriver) {
            return res.status(404).json(ApiResponse(false, 'Driver not found.'));
        }

        const isMatch = await bcrypt.compare(password, existingDriver.password);
        if (!isMatch) {
            return res.status(400).json(ApiResponse(false, 'Invalid credentials.'));
        }

        // Generate JWT token
        const token = jwt.sign({ driverId: existingDriver._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json(ApiResponse(true, 'Login successful!', {
            token,
            driverId: existingDriver._id,
            name: existingDriver.name,
        }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(ApiResponse(false, 'Server error, please try again.'));
    }
};

// Get a Random Driver by Hospital Name Controller
exports.getRandomDriverByHospital = async (req, res) => {
    const { hospitalName } = req.query;

    try {
        // Find all drivers working at the specified hospital
        const drivers = await Driver.find({ hospitalName });

        if (drivers.length === 0) {
            return res.status(404).json(ApiResponse(false, 'No drivers found for this hospital.'));
        }

        // Select one random driver from the list
        const randomIndex = Math.floor(Math.random() * drivers.length);
        const randomDriver = drivers[randomIndex];

        // Return the random driver details
        const driverDetails = {
            id: randomDriver._id,
            name: randomDriver.name,
            ambulanceNumber: randomDriver.ambulanceNumber,
            hospitalName: randomDriver.hospitalName,
            phoneNumber: randomDriver.phoneNumber,
            carDetails: randomDriver.carDetails
        };

        return res.status(200).json(ApiResponse(true, 'Random driver found!', driverDetails));
    } catch (error) {
        console.error(error);
        return res.status(500).json(ApiResponse(false, 'Server error, please try again.'));
    }
};
