const Book = require('../Model/Book.model');
const createError = require("http-errors");
const mongoose = require('mongoose');

module.exports = {
    getAllBooks: async(req,res,next) => {
        try {
            const result = await Book.find({}, {__v:0})
            res.send(result);
        } catch (error) {
            console.log(error.message);
        }
        
    },
    createBook: async (req,res,next) => {
        try {
            const book = new Book(req.body);
            const result = await book.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if(error.name === 'ValidationError'){
                next(createError(422, error.message))
                return;
            }
            next(error);
        }
    },
    getBookById:  async(req,res,next) => {
        const id = req.params.id;
        try {
            const book = await Book.findById(id, {__v:0});
            if(!book){
                throw createError(404, "Book Not found!")
            }
            res.send(book);
        } catch (error) {
            console.log(error.message)
            if (error.message.indexOf("Cast to ObjectId failed") !== -1){
                next(createError.BadRequest("Invalid product id"));
            }else {
                  next(error);
              }
        }
    },
    updateBookById: async(req,res,next) => {
        const id = req.params.id;
        const updates = req.body;
        try {
            const result = await Book.findByIdAndUpdate(id,updates);
            if(!result){
                throw createError(404, "Book Not found!")
            }
            res.send(result);
        } catch (error) {
            console.log(error.message)
            if (error.message.indexOf("Cast to ObjectId failed") !== -1){
                next(createError.BadRequest("Invalid product id"));
            }else {
                  next(error);
              }
        }
    },
    deleteBookById: async(req,res,next) => {
        const id = req.params.id;
        try {
            const result = await Book.findByIdAndDelete(id);
            if(!result){
                throw createError(404, "Book Not found!")
            }
            res.send(result);
        } catch (error) {
            console.log(error.message)
            if (error.message.indexOf("Cast to ObjectId failed") !== -1){
                next(createError.BadRequest("Invalid product id"));
            }else {
                  next(error);
              }
        }
    }
}