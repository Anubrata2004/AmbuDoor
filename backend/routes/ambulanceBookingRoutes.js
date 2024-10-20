const express = require('express');
const router = express.Router();
const { bookAmbulance ,getLatestPickupInfo} = require('../controllers/ambulanceBookingController');

// POST /api/book-ambulance
router.post('/book-ambulance', bookAmbulance);

// GET /api/ambulance/pickup-info
router.get('/ambulance/pickup-info', getLatestPickupInfo);

module.exports = router;
