const express = require('express');
const { createProduct, singleProduct, deleteProduct, updateProduct, allProduct, allActiveProduct, getSearchData } = require('../controllers/productController');
const { uploadProductImg, updateProductImg } = require('../helpers/multerForProduct');
const router = express.Router();


router.post('/createProduct', uploadProductImg.array('avatar', 5), createProduct);  // checked
router.get('/allProduct', allProduct);  // checked
router.get('/allActiveProduct', allActiveProduct) // checked
router.get('/singleProduct/:id', singleProduct);  // checked
router.delete('/deleteProduct/:id', deleteProduct); // checked
router.post('/updateProduct/:id', updateProductImg.array('avatar', 5), updateProduct);  // checked
router.post('/searchProduct', getSearchData);  

module.exports = router;