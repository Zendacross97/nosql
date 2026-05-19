const Product = require('../models/product');

exports.postAddProduct = async (req, res) => {
  try {
    const { title, imageUrl, price, description } = req.body;
    const product = await Product.create({ title, price, description, imageUrl });
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product: ' + error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Mongoose handles this directly
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products: ' + error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { prodId } = req.params;
    const product = await Product.findById(prodId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Error fetching product: ' + error.message });
  }
};

exports.postEditProduct = async (req, res) => {
  try {
    const { prodId } = req.params;
    const { title, imageUrl, price, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      prodId,
      { title, imageUrl, price, description },
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Error updating product: ' + error.message });
  }
};

exports.postDeleteProduct = async (req, res) => {
  try {
    const { prodId } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(prodId);
    if (!deletedProduct) return res.status(404).json({ error: 'Product not found' });
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Error deleting product: ' + error.message });
  }
};