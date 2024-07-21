const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    publicationYear: { type: Number, required: true },
    genre: { type: String, required: true },
    isbn: { type: String, required: true },
    available: { type: Boolean, default: true },
    imageUrl: { type: String }, 
    price: { type: String, required: true } 
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
