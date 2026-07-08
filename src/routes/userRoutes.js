const express = require('express');
const { allUser, singleUser, deleteUser, updateUser } = require('../controllers/userController');
const router = express.Router();

router.get('/allUser', allUser);  // checked
router.get('/singleUser/:id', singleUser);  // checked
router.delete('/deleteUser/:id', deleteUser);  // checked
router.post('/updateUser/:id', updateUser);  // checked

module.exports = router;