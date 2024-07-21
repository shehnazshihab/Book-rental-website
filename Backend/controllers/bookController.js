const Book = require('../models/book');

// Add a new book
const addBook = async (req, res) => {
    const { title, author, description, publicationYear, genre, isbn, imageUrl, price } = req.body;
    if (!title || !author || !description || !publicationYear || !genre || !isbn || !imageUrl || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newBook = new Book({ title, author, description, publicationYear, genre, isbn, imageUrl, price });
        await newBook.save();
        res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ error: 'Error adding book: ' + error.message });
    }
};

// Get all books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books: ' + error.message });
    }
};

// Get details of a single book
const getBookDetails = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching book details: ' + error.message });
    }
};

// Update a book
const updateBook = async (req, res) => {
    const { title, author, description, publicationYear, genre, isbn, imageUrl, price } = req.body;
    if (!title || !author || !description || !publicationYear || !genre || !isbn || !imageUrl || !price) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, description, publicationYear, genre, isbn, imageUrl, price },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        res.status(500).json({ error: 'Error updating book: ' + error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book: ' + error.message });
    }
};


// Update rental status of a book
const updateRentalStatus = async (req, res) => {
    const { available } = req.body;
    if (typeof available !== 'boolean') {
        return res.status(400).json({ error: 'Invalid rental status' });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { available },
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Rental status updated successfully', book: updatedBook });
    } catch (error) {
        res.status(500).json({ error: 'Error updating rental status: ' + error.message });
    }
};



module.exports = { addBook, getBooks, getBookDetails, updateBook, deleteBook, updateRentalStatus };



