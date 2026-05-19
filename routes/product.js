const express = require("express");
const router = express.Router();
const productController = require ('../controllers/product');

router.post('/add-product', productController.postAddProduct);
router.get('/get-product', productController.getAllProducts);
router.get('/get-product/:prodId', productController.getProductById);
router.put('/edit-product/:prodId', productController.postEditProduct);
router.delete('/delete-product/:prodId', productController.postDeleteProduct);

module.exports = router;