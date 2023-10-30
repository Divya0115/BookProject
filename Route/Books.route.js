const express = require("express");
const route = express.Router();
const productController = require('../Controllers/book.controller');

const Book = require("../Model/Book.model");

route.get('/', productController.getAllBooks );

route.post('/', productController.createBook);

route.get('/:id', productController.getBookById);

route.patch('/:id', productController.updateBookById);

route.delete('/:id', productController.deleteBookById);

//abc

module.exports = route;
