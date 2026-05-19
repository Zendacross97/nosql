const Product = require('../models/product');

exports.postCart = async (req, res) => {
  try {
    const { prodId } = req.params;
    const updatedCart = await req.user.addToCart(prodId);
    res.status(201).json({
      message: 'Product added to cart successfully',
      cart: updatedCart
    });
  } catch (error) {
    console.error('Error posting cart:', error);
    res.status(500).json({ error: 'Error posting cart: ' + error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    // Populate product details for each cart item
    const user = await req.user.populate('cart.items.productId');
    res.status(200).json({ cart: user.cart.items })
  } catch (error) {
    console.error('Error getting cart:', error);
    res.status(500).json({ error: 'Error getting cart: ' + error.message });
  }
};

exports.postCartDeleteProduct = async (req, res) => {
  try {
    const { prodId } = req.params;

    // Remove product from user's cart
    await req.user.deleteItemFromCart(prodId);

    res.status(200).json({ message: 'Cart item deleted successfully' });
  } catch (error) {
    console.error('Error deleting cart item:', error);
    res.status(500).json({ error: 'Error deleting cart item: ' + error.message });
  }
};
