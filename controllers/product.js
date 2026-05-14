const Product = require (`../models/product`);

exports.postAddProduct = async (req, res) => {
    try {
        const { title, imageUrl, price, description } = req.body;
        const product = new Product (title, price, description, imageUrl, req.user._id);
        const createdProduct = await product.save();
        res.status(200).json(createdProduct);
    } catch (error) {
        return res.status(500).json({ err: 'error creating product: ' + error.message });
    }
}

exports.getAddProduct = async (req, res) => {
    try {
        const products = await Product.fetchAll();
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ err: 'error fetching product: ' + error.message });
    }
}

exports.getAddProductById = async (req, res) => {
    try {
        const {prodId} = req.params;
        const product = await Product.findById(prodId);
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ err: 'error fetching product: ' + error.message });
    }
}

exports.postEditProduct = async (req, res) => {
    try {
        const {prodId} = req.params;
        const { title, imageUrl, price, description } = req.body;
        const product = new Product(title, price, description, imageUrl, prodId);
        const updatedProduct = await product.save();
        res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ err: 'error updating product: ' + error.message });
    }
}

exports.postDeleteProduct = async (req, res) => {
    try {
        const {prodId} = req.params;
        const deletedProduct = await Product.findById(prodId); // to get the product before deleting
        await Product.deleteById(prodId);
        res.status(200).json(deletedProduct);
    } catch (error) {
        return res.status(500).json({ err: 'error deleting product: ' + error.message });
    }
}