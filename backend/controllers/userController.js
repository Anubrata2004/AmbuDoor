const bcrypt = require('bcrypt');
const User = require('../models/user');
const ApiResponse = require('../helpers/ApiResponse');
const jwt = require('jsonwebtoken');

// User Signup Controller
exports.userSignup = async (req, res) => {
    const { name, address, phoneNumber, hospital, condition, password } = req.body;

    try {
        const existingUser = await User.findOne({ phoneNumber });
        if (existingUser) {
            return res.status(400).json(ApiResponse(false, 'User already exists with this phone number.'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            address,
            phoneNumber,
            hospital,
            condition,
            password: hashedPassword
        });

        await newUser.save();
        return res.status(201).json(ApiResponse(true, 'Signup successful!', { userId: newUser._id }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(ApiResponse(false, 'Server error, please try again.'));
    }
};

// User Login Controller
exports.userLogin = async (req, res) => {
    const { phoneNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({ phoneNumber });
        if (!existingUser) {
            return res.status(404).json(ApiResponse(false, 'User not found.'));
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(400).json(ApiResponse(false, 'Invalid credentials.'));
        }

        // Generate JWT token
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json(ApiResponse(true, 'Login successful!', {
            token,
            userId: existingUser._id,
            name: existingUser.name,
        }));
    } catch (error) {
        console.error(error);
        return res.status(500).json(ApiResponse(false, 'Server error, please try again.'));
    }
};
