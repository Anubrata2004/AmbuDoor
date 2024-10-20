const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    hospital: { type: String, required: true },
    condition: { type: String },
    password: { type: String, required: true } 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
