exports.postOrder = async (req, res) => {
    try {
        const order = await req.user.addOrder();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ err: 'error posting order' + error.message })
    }
}

exports.getOrder = async (req, res) => {
    try {
        const orders = await req.user.getOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({err: 'error getting orders' + error.message});
    }
}