const express = require('express');
const { addBook, getBooks, getBookDetails, updateBook, deleteBook , updateRentalStatus} = require('../controllers/bookController');
const router = express.Router();


router.post('/add', addBook);
router.get('/', getBooks);
router.get('/:id', getBookDetails);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.put('/rental-status/:id', updateRentalStatus);



module.exports = router;
