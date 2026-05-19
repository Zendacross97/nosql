require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const mongoConnect = require (`./util/database`).mongoConnect;

app.use(express.urlencoded({ extended: true }));

const User = require('./models/user');

const productRoutes = require("./routes/product");
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
// const orderRoutes = require('./routes/order');

app.use((req, res, next) => {
    User.findById('6a0c20d9b0877087d336f902') //login - shortcut
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err));
})

app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
// app.use('/order', orderRoutes);

// mongoConnect(() => {
//     app.listen(process.env.PORT);
// });

mongoose.connect('mongodb+srv://sidhchakraborty66:Tomal1997@cluster0.zjl8yge.mongodb.net/')
.then(res => {
    app.listen(process.env.PORT);
})
.catch(err => {
    console.log(err);
});