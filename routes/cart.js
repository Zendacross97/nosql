const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cart');

router.post('/add-cart/:prodId', cartController.postCart);
router.get('/get-cart', cartController.getCart);
router.delete('/delete-cart-item/:prodId', cartController.postCartDeleteProduct);

module.exports = router;