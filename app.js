require('dotenv').config();
const express = require('express');
const app = express();
const mongoConnect = require (`./util/database`).mongoConnect;

app.use(express.urlencoded({ extended: true }));

const adminRoutes = require("./routes/admin");

app.use('/admin', adminRoutes);

mongoConnect(() => {
    app.listen(process.env.PORT);
});