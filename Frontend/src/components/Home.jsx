import React from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <Box 
        sx={{
          display: 'flex',
          minHeight: '80vh',
          alignItems: 'center',
          justifyContent: 'center', 
          position: 'relative',
          backgroundColor: '#EEEEEE', 
          padding: '40px 20px',
          backgroundImage: `url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Container maxWidth="lg" sx={{ zIndex: 1, textAlign: 'left', pl: 0, ml: 2 }}>

          <Typography variant="h3" component="h1" gutterBottom style={{ color: '#78A2A5', fontWeight: 'bold' }}>
          Top-Quality Reads, Budget Prices
          </Typography>
          <Typography variant="h6" gutterBottom style={{ color: '#31363F' }}>
            Discover amazing deals on textbook rentals in our marketplace.<br />
            Rent with peace of mind today!
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link} to="/books" 
              startIcon={<SearchIcon />}
              sx={{
                backgroundColor: '#76ABAE',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#EEEEEE',
                  color: '#78A2A5',
                },
              }}
            >
              Explore Books
            </Button>
          </Box>

        </Container>
      </Box>

      {/* Main Content Section */}
      <Box sx={{ display: 'flex', marginTop: '0px' }}>
        {/* Left Section (Authors) */}
        <Box sx={{ flex: '2', backgroundColor: '#f0f0f0', padding: '40px' }}>
          {/* Stacked Sections for Authors */}
          <Box sx={{ marginBottom: '10px' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                  <img
                    src="https://media.gettyimages.com/id/120452510/photo/india-film-maker-satyajit-ray-in-calcutta-india-in-1997.jpg?s=612x612&w=0&k=20&c=IEGyu-OLZ00Y3iYP9kSMwGAQOhG8QZb05tpUuafgVsM="
                    alt="Author 1"
                    style={{ width: '100%', maxWidth: '100%', borderRadius: '8px' }}
                  />
                  <Box sx={{ position: 'absolute', bottom: 5, left: 0,  borderRadius: '8px',right: 0, p: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}>
                    <Typography variant="subtitle2" >
                      Satyajit Ray
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                  <img
                    src="https://media.gettyimages.com/id/1067071932/photo/london-england-j-k-rowling-attends-the-uk-premiere-of-fantastic-beasts-the-crimes-of.jpg?s=612x612&w=0&k=20&c=gKaej-E1iRTIQ445zes7pHKKycQoTbNeY83ezoTNRc0="
                    alt="Author 2"
                    style={{ width: '100%', maxWidth: '100%', borderRadius: '8px' }}
                  />
                  <Box sx={{ position: 'absolute', bottom: 5, left: 0, right: 0 , borderRadius: '8px', p: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}>
                    <Typography variant="subtitle2" >
                      J K Rowling
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                  <img
                    src="https://media.gettyimages.com/id/1147538674/photo/hay-on-wye-wales-arundhati-roy-booker-prize-winning-author-during-the-2019-hay-festival-on.jpg?s=612x612&w=0&k=20&c=Obty1NmMe_3X1HcE2pLyfNl7qRakuLuY30fU4blzOuY="
                    alt="Author 3"
                    style={{ width: '100%', maxWidth: '100%', borderRadius: '8px' }}
                  />
                  <Box sx={{ position: 'absolute', bottom: 5, left: 0, right: 0 , borderRadius: '8px', p: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', color: '#fff' }}>
                    <Typography variant="subtitle2" >
                      Arundhati Roy
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Right Section (Exclusive Authors) */}
        <Box sx={{ flex: '1', backgroundColor: '#76ABAE', color: '#fff', padding: '40px', textAlign: 'center', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', marginTop: '30%' }}>
            Our Exclusive Authors
          </Typography><br />
          <Typography variant="body1" style={{ fontSize: '1.2rem', lineHeight: '1.6', fontFamily: 'Poppins, sans-serif', justifyContent: 'center' }}>
            Uncover the brilliance of our featured authors as you delve into their captivating stories and explore the rich tapestry of their literary worlds.
          </Typography>
        </Box>
      </Box>

      {/* Trending Books Section */}
      <Box sx={{ display: 'flex', marginTop: '0px', backgroundColor: '#31363F' }}>
        {/* Left Section (Trending Books Info) */}
        <Box sx={{ flex: '1', backgroundColor: '#76ABAE', color: '#fff', padding: '40px', textAlign: 'center', justifyContent: 'center' }}>
          <Typography variant="h3" gutterBottom style={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif', marginTop: '30%' }}>
            Trending Books
          </Typography><br />
          <Typography variant="body1" style={{ fontSize: '1.2rem', lineHeight: '1.6', fontFamily: 'Poppins, sans-serif', justifyContent: 'center' }}>
            Discover the latest trending books of this week and find your next page-turner!
          </Typography>
        </Box>

        {/* Right Section (Trending Books) */}
        <Box sx={{ flex: '2', backgroundColor: '#222831', padding: '40px' }}>
          {/* Stacked Sections for Trending Books */}
          <Box sx={{ marginBottom: '10px' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                  <img
                    src="https://media.gettyimages.com/id/90007111/photo/united-states-captains-courageous.jpg?s=612x612&w=0&k=20&c=EFE-64914_6cMvMmbr5YiNBe506XhaLhiaOoJu2Sc_0="
                    alt="Trending Book 1"
                    style={{ width: '100%', maxWidth: '100%', borderRadius: '8px' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                  <img
                    src="https://media.gettyimages.com/id/90017683/photo/united-states-robinson-crusoe.jpg?s=612x612&w=0&k=20&c=S0Ok0NInTQv4MBNQAGHwE2Vw3sTPzZZvUMyBMh9Y7z8="
                    alt="Trending Book 2"
                    style={{ width: '100%', maxWidth: '100%', borderRadius: '8px' }}
                  />
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ position: 'relative', textAlign: 'center' }}>
                  <img
                    src="https://media.gettyimages.com/id/149013191/photo/book-cover-of-little-red-riding-hood-published-by-w-b-conkey-company-1897.jpg?s=612x612&w=0&k=20&c=gan_IW1UvYZoZOC5ajoOyh1TOkn6nQ3oU8BbpstnUEc="
                    alt="Trending Book 3"
                    style={{ width: '100%', maxWidth: '100%', borderRadius: '8px' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
