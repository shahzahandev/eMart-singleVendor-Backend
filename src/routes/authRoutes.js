const express = require('express');
const router = express.Router();
const {register, login, forgotPassword, resetPassword, resendEmailVerification} = require('../controllers/authController');

router.post('/register', register);  // checked
router.post('/login', login); // checked
router.post('/forgotPassword', forgotPassword); // checked
router.post('/resetPassword/:token', resetPassword);  // checked
router.post('/resendEmailVerification', resendEmailVerification); // NO check


module.exports = router 