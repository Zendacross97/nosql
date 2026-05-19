const User = require('../models/user');

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({
      name,
      email,
      cart: { items: [] } // default empty cart
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user: ' + error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-__v').populate('cart.items.productId');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Error getting user by ID: ' + error.message });
  }
};
