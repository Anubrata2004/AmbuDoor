const express = require('express');
const router = express.Router();
const { driverSignup, driverLogin } = require('../controllers/driverController');

// POST /api/driver-signup
router.post('/driver-signup', driverSignup);

// POST /api/driver-login
router.post('/driver-login', driverLogin);

module.exports = router;
