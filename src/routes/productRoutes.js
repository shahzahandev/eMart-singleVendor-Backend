const express = require('express');
const { createProduct, singleProduct, deleteProduct, updateProduct, allProduct } = require('../controllers/productController');
const router = express.Router();


router.post('/createProduct', createProduct);  // checked
router.get('/allProduct', allProduct);  // checked
router.get('/singleProduct/:id', singleProduct);  // checked
router.delete('/deleteProduct/:id', deleteProduct); // checked
router.post('/updateProduct/:id', updateProduct);  // checked

module.exports = router;