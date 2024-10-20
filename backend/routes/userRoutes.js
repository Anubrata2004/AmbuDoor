const express = require('express');
const router = express.Router();
const { userSignup, userLogin } = require('../controllers/userController');

// POST /api/user-signup
router.post('/user-signup', userSignup);

// POST /api/user-login
router.post('/user-login', userLogin);

module.exports = router;
