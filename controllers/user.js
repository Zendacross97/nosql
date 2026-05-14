const User = require('../models/user');

exports.addUser = async (req, res) => {
    try {
        const {name, email} = req.body;
        const newUser = new User (name, email);
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ err: 'error creating user: ' + error.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await User.findUserById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ err: 'error getting user by id: ' + error.message });
    }
}