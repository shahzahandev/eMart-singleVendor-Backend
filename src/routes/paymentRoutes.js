const express = require('express');
const { paymentController } = require('../controllers/paymentController');
const router = express.Router();


router.post('/payment', paymentController);  // checked

module.exports = router;