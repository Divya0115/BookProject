const express = require("express");
const createError = require('http-errors');
const app = express();
const dotenv = require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require('./initDB')();

const bookRoute = require("./Route/Books.route");
app.use('/book', bookRoute);

app.use((req,res,next) => {
    next(createError(404, "Not Found"));
 })

 app.use((err,req,res,next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
