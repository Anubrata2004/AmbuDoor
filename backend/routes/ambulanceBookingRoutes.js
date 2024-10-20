const express = require('express');
const router = express.Router();
const { bookAmbulance } = require('../controllers/ambulanceBookingController');

// POST /api/book-ambulance
router.post('/book-ambulance', bookAmbulance);

module.exports = router;
