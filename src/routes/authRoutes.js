const express = require('express');
const router = express.Router();
const {register, login, forgotPassword, resetPassword, resendEmailVerification, verifyEmailCheck} = require('../controllers/authController');

router.post('/register', register);  // checked
router.post('/login', login); // checked
router.post('/forgotPassword', forgotPassword); // checked
router.post('/resetPassword/:token', resetPassword);  // checked
router.post('/resendEmailVerification', resendEmailVerification); // checked
router.post('/verifyEmailCheck/:token', verifyEmailCheck); // checked 

module.exports = router 