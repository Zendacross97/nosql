const Product = require (`../models/product`);

exports.postAddProduct = async (req, res) => {
    try {
        const { title, imageUrl, price, description } = req.body;
        const product = new Product (title, price, description, imageUrl);
        const createdProduct = await product.save();
        res.status(200).json(createdProduct);
    } catch (error) {
        return res.status(500).json({ err: 'error creating product: ' + error.message });
    }
}