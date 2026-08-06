const express = require('express');
const { allUser, singleUser, deleteUser, updateUser, allDeleteUser, getSearchData } = require('../controllers/userController');
const router = express.Router();

router.get('/allUser', allUser);  // checked
router.get('/singleUser/:id', singleUser);  // checked
router.delete('/deleteUser/:id', deleteUser);  // checked
router.post('/updateUser/:id', updateUser);  // checked
router.get('/allDeleteUser', allDeleteUser); // checked
router.post('/searchUser', getSearchData);

module.exports = router;