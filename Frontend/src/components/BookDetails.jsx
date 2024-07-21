import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Box,
  IconButton,
} from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false); 


  const likedBooks = []; 

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  const addLikedBook = () => {
    
    console.log('Add liked book');
  };

  const removeLikedBook = () => {
    
    console.log('Remove liked book');
  };

  const handleLike = () => {
    if (isLiked) {
      removeLikedBook();
      setIsLiked(false);
    } else {
      addLikedBook();
      setIsLiked(true);
    }
  };

  const handleRent = () => {
    console.log(`Requested rental for book: ${book.title}`);
    navigate(`/books/${id}/checkout`); 
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>
          Error: {error}
        </Typography>
      </Container>
    );
  }

  if (!book) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>
          Book Not Found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardMedia
              component="img"
              image={book.imageUrl}
              alt={book.title}
              sx={{ objectFit: 'cover', height: '100%' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                {book.title.toUpperCase()}
              </Typography>
              <Typography  sx={{ fontSize: 20, color: '#76ABAE',fontWeight: 'bold', }} gutterBottom>
                Author: {book.author.toUpperCase()}
              </Typography>
              <Typography sx={{ fontSize: 16, color: '#222831' }} variant="body1" paragraph>
                {book.description}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 20, color: '#222831',mt:3 }}>
                Publication Year: {book.publicationYear}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 20, color: '#222831',mt:2 }}>
                Genre: {book.genre}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 20, color: '#222831' ,mt:2}}>
                ISBN: {book.isbn}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                px: 3,
                pb: 3,
              }}
            >
              <Box>
                <Typography sx={{fontWeight: 'bold'}}variant="h5" color="text.primary">
                  Price: {book.price}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                    color: book.available ? 'green' : 'red',
                    mt: 1,
                  }}
                >
                  {book.available ? 'AVAILABLE' : 'CHECKED OUT'}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={handleLike} sx={{ color: isLiked ? '#F28482' : '#F28482' ,mt:5,mb:6}}>
                  {isLiked ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Button
                  variant="contained"
                  onClick={handleRent}
                  sx={{
                    backgroundColor: '#76ABAE',
                    color: '#EEEEEE',
                    ml: 3,mt:5,mr:4,mb:6,
                    '&:hover': { backgroundColor: '#333' },
                  }}
                  disabled={!book.available}
                >
                  Rent
                </Button>
              </Box>
            </Box>
            <Box sx={{ mt: 5,mb:3,ml:4
             }}>
              <Button component={Link} to="/books" variant="text" sx={{color:"#76ABAE", '&:hover': { backgroundColor: '#eeeeee' }}}>
                Back to Books
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetails;
