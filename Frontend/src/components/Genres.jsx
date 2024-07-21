import React from 'react';
import { Container, Typography, Grid, Card, CardMedia, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const genres = [
  { id: 1, name: 'Fiction', image: 'https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Science Fiction', image: 'https://booksandbao.com/wp-content/uploads/2023/03/best-sci-fi-books-ever-e1678272724101-1000x563.jpg.webp' },
  { id: 3, name: 'Fantasy', image: 'https://images.gr-assets.com/misc/1687810670-1687810670_goodreads_misc.png' },
  { id: 4, name: 'Mystery', image: 'https://hips.hearstapps.com/hmg-prod/images/best-mystery-books-1659119170.jpg?crop=0.467xw:1.00xh;0.267xw,0&resize=640:*' },
  { id: 5, name: 'Thriller', image: 'https://www.booklistqueen.com/wp-content/uploads/best-thriller-books-2020-feature.jpg' },
  { id: 6, name: 'Romance', image: 'https://nypost.com/wp-content/uploads/sites/2/2022/02/romcoms.png' },
  { id: 7, name: 'Biography', image: 'https://i.insider.com/6109ac36372268001a597e25?width=700' },
  { id: 8, name: 'History', image: 'https://images.unsplash.com/photo-1529589585661-8fb5cdc75c48?q=80&w=2016&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 9, name: 'Self-help', image: 'https://storage.ko-fi.com/cdn/useruploads/display/6fdc300b-e659-4302-b6ce-539047f64bdc_15-self-help-books-for-men-to-d-to-their-reing-list-feature.jpg' },
];

const GenrePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>Explore Genres</Typography>
      <Grid container spacing={3}>
        {genres.map(genre => (
          <Grid item xs={12} sm={6} md={4} key={genre.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}>
              <CardMedia
                component="img"
                height="160"
                image={genre.image}
                alt={genre.name}
                sx={{ objectFit: 'cover' }}
              />
              <Typography variant="h5" component="h4" sx={{paddingTop:1,paddingBottom:1, mt: 0,mb:0,color:"#EEEEEE", textAlign: 'center',backgroundColor:"#222831" }}>
                {genre.name}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GenrePage;
