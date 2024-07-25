import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardMedia ,Box} from '@mui/material';
import { Link } from 'react-router-dom';

const BookListPage = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <Box sx={{ 
      backgroundColor: '#F6FEFF', 
      height: '100vh', 
      width: '100vw', 
      display: 'flex',  
      p: 0, 
      m: 0 
    }}>
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Books
      </Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4} lg={3}>
            <Card
              component={Link}
              to={`/books/${book._id}`}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  textDecoration: 'none',
                },
              }}
            >
              <CardMedia
                component="img"
                image={book.imageUrl}
                alt={book.title}
                sx={{ objectFit: 'cover', height: 400, width: '100%' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {book.title.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </Box>
  );
};

export default BookListPage;
