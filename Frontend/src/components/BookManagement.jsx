import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BookManagement = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [openAddBookDialog, setOpenAddBookDialog] = useState(false);
  const [openEditBookDialog, setOpenEditBookDialog] = useState(false);
  const [editBook, setEditBook] = useState({
    _id: '',
    title: '',
    author: '',
    description: '',
    publicationYear: '',
    genre: '',
    isbn: '',
    price: '',
    available: true,
    imageUrl: ''
  });
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    publicationYear: '',
    genre: '',
    isbn: '',
    price: '',
    available: true,
    imageUrl: ''
  });
  

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3005/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleAddBook = async () => {
    try {
      console.log('Adding new book:', newBook);
      const bookDataString = JSON.stringify(newBook);
      const response = await axios.post('http://localhost:3005/books/add', bookDataString, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Book added successfully:', response.data);
      fetchBooks();
      handleCloseAddBookDialog();
    } catch (error) {
      console.error('Error adding book:', error);
      if (error.response && error.response.data) {
        console.error('Response data:', error.response.data);
      }
    }
  };
  
  
  const handleEditBook = async () => {
    try {
      const response = await axios.put(`http://localhost:3005/books/${editBook._id}`, editBook);
      const updatedBooks = books.map(book => (book._id === editBook._id ? response.data.book : book));
      setBooks(updatedBooks);
      handleCloseEditBookDialog();
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/books/${id}`);
      setBooks(books.filter(book => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleClickOpenAddBookDialog = () => {
    setOpenAddBookDialog(true);
  };

  const handleCloseAddBookDialog = () => {
    setOpenAddBookDialog(false);
    setNewBook({
      title: '',
      author: '',
      description: '',
      publicationYear: '',
      genre: '',
      isbn: '',
      price: '',
      available: true,
      imageUrl: ''
    });
  };

  const handleClickOpenEditBookDialog = (book) => {
    setEditBook(book);
    setOpenEditBookDialog(true);
  };

  const handleCloseEditBookDialog = () => {
    setOpenEditBookDialog(false);
    setEditBook({
      _id: '',
      title: '',
      author: '',
      description: '',
      publicationYear: '',
      genre: '',
      isbn: '',
      price: '',
      available: true,
      imageUrl: ''
    });
  };

  const handleMarkAvailability = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus; 
      const response = await axios.put(`http://localhost:3005/books/rental-status/${id}`, { available: newStatus });
      const updatedBooks = books.map(book => (book._id === id ? { ...book, available: newStatus } : book));
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error marking availability:', error);
    }
  };

  return (
    <Box sx={{ 
      backgroundColor: '#F6FEFF', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex',  
      p: 0, 
      m: 0 
    }}>
    <Container>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#76ABAE', fontWeight: 'bold', marginBottom: 4 }}>
          BOOK MANAGEMENT
        </Typography>

        <Box sx={{ marginBottom: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpenAddBookDialog}
            sx={{ marginBottom: 2, backgroundColor: '#222831', '&:hover': { backgroundColor: '#31363F' } }}
          >
            Add Book
          </Button>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Publication Year</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id}>
                    <TableCell><img src={book.imageUrl} alt={book.title} style={{ width: '50px' }} /></TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.publicationYear}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.price}</TableCell>
                    <TableCell>{book.available ? 'Available' : 'Rented'}</TableCell>
                    <TableCell>
                    <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
  <Button
    variant="contained"
    color="primary"
    onClick={() => handleClickOpenEditBookDialog(book)}
    sx={{ backgroundColor: '#222831', '&:hover': { backgroundColor: '#31363F' } }}
  >
    Edit
  </Button>
  <Button
    variant="contained"
    color="error"
    onClick={() => handleDeleteBook(book._id)}
    sx={{ backgroundColor: '#31363F', '&:hover': { backgroundColor: '#222831', color: '#EEEEEE' } }}
  >
    Delete
  </Button>
  <Button
    variant="contained"
    onClick={() => handleMarkAvailability(book._id, book.available)}
    sx={{
      backgroundColor: book.available ? '#76ABAE' : '#F28482',
      color: '#EEEEEE',
      '&:hover': { backgroundColor: book.available ? '#333' : '#C25950' },
    }}
  >
    {book.available ? 'Mark Rented' : 'Mark Available'}
  </Button>
</Box>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Add Book Dialog */}
      <Dialog open={openAddBookDialog} onClose={handleCloseAddBookDialog}>
        <DialogTitle>Add New Book</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#76ABAE' }}>
            Please fill out the details below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            id="author"
            label="Author"
            fullWidth
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            id="publicationYear"
            label="Publication Year"
            fullWidth
            value={newBook.publicationYear}
            onChange={(e) => setNewBook({ ...newBook, publicationYear: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            id="genre"
            label="Genre"
            fullWidth
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            id="isbn"
            label="ISBN"
            fullWidth
            value={newBook.isbn}
            onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            fullWidth
            value={newBook.price}
            onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            fullWidth
            value={newBook.imageUrl}
            onChange={(e) => setNewBook({ ...newBook, imageUrl: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddBookDialog} sx={{ color: '#222831' }}>Cancel</Button>
          <Button onClick={handleAddBook} sx={{ color: '#222831' }}>Add Book</Button>
        </DialogActions>
      </Dialog>


      {/* Edit Book Dialog */}
      <Dialog open={openEditBookDialog} onClose={handleCloseEditBookDialog}>
        <DialogTitle>Edit Book</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#76ABAE' }}>
            Please update the book details below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="edit-title"
            label="Title"
            fullWidth
            value={editBook.title}
            sx={{ mt: 2, '& .MuiOutlinedInput-root': { borderColor: '#222831' } }}
            onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
          />
          <TextField
            margin="dense"
            id="edit-author"
            label="Author"
            fullWidth
            value={editBook.author}
            onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
          />
          <TextField
            margin="dense"
            id="edit-description"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={editBook.description}
            onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
          />
          <TextField
            margin="dense"
            id="edit-publication-year"
            label="Publication Year"
            fullWidth
            value={editBook.publicationYear}
            onChange={(e) => setEditBook({ ...editBook, publicationYear: e.target.value })}
          />
          <TextField
            margin="dense"
            id="edit-genre"
            label="Genre"
            fullWidth
            value={editBook.genre}
            onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
          />
          <TextField
            margin="dense"
            id="edit-isbn"
            label="ISBN"
            fullWidth
            value={editBook.isbn}
            onChange={(e) => setEditBook({ ...editBook, isbn: e.target.value })}
          />
          <TextField
            margin="dense"
            id="edit-price"
            label="Price"
            fullWidth
            value={editBook.price}
            onChange={(e) => setEditBook({ ...editBook, price: e.target.value })}
          />
          <TextField
            margin="dense"
            id="edit-price"
            label="Image URL"
            fullWidth
            value={editBook.imageUrl}
            onChange={(e) => setEditBook({ ...editBook, imageUrl: e.target.value })}
          />
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditBookDialog}sx={{color:"#222831"}}>Cancel</Button>
          <Button onClick={handleEditBook} sx={{color:"#222831"}}>Save Changes</Button>
        </DialogActions>
      </Dialog>

    </Container>
    </Box>
  );
};

export default BookManagement;
