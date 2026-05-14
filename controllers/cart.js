const Product = require('../models/product');

exports.postCart = async (req, res) => {
    try {
        const {prodId} = req.params;
        const product = await Product.findById(prodId);
        const cartProduct = await req.user.addToCart(product);
        res.status(201).json(cartProduct);
    } catch (error) {
        res.status(500).json({ err: 'error posting cart: ' + error.message });
    }
}

exports.getCart = async (req, res) => {
    try {
        const cart = await req.user.getCart();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ err: 'error getting cart' + error.message });
    }
}

exports.postCartDeleteProduct = async (req, res) => {
    try {
        const { prodId } = req.params;
        await req.user.deleteItemFromCart(prodId);
        res.status(200).json({message: 'Cart item deleted successfully'});
    } catch (error) {
        res.status(500).json({ err: 'error getting cart' + error.message });
    }
}