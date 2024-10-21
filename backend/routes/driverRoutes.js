const express = require('express');
const router = express.Router();
const { driverSignup, driverLogin, getRandomDriverByHospital } = require('../controllers/driverController');

// POST /api/driver-signup
router.post('/driver-signup', driverSignup);

// POST /api/driver-login
router.post('/driver-login', driverLogin);

// GET /api/driver-random - Search for a random driver by hospital name
router.get('/driver-random', getRandomDriverByHospital);

module.exports = router;
