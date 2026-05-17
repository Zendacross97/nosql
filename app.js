require('dotenv').config();
const express = require('express');
const app = express();
const mongoConnect = require (`./util/database`).mongoConnect;

app.use(express.urlencoded({ extended: true }));

const User = require('./models/user');

const productRoutes = require("./routes/product");
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

app.use((req, res, next) => {
    User.findUserById('6a06201f277f3e486f3515e0') //login - shortcut
    .then(user => {
        req.user = new User (user.name, user.email, user.cart, user._id);
        next();
    })
    .catch(err => console.log(err));
})

app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/order', orderRoutes);

mongoConnect(() => {
    app.listen(process.env.PORT);
});