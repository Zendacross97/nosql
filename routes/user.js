const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.post('/add-user', userController.addUser);
router.get('/get-user/:userId', userController.getUserById );

module.exports = router;