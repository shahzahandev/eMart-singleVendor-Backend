const express = require('express');
const { createCart, deletecart, increDecre, allCart, singleUserCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/createCart', createCart);  // checked
router.post('/increDecre/:id', increDecre); // checked
router.delete('/deleteCart/:id', deletecart);  // checked
router.get('/singleUserCart/:userid', singleUserCart); // checked
router.get('/allCart', allCart); // checked

module.exports = router;