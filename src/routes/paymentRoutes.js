const express = require('express');
const { paymentController, singleOrder, allOrder } = require('../controllers/paymentController');
const router = express.Router();


router.post('/payment', paymentController);  // checked
router.get('/singleOrder/:userId', singleOrder);  // checked
router.get('/allOrder', allOrder);  // checked

module.exports = router;