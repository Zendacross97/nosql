const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');

router.post('/add-order', orderController.postOrder);
router.get('/get-order', orderController.getOrder);

module.exports = router;