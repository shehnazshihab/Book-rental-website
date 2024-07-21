import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';

const AboutUsPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" gutterBottom>About Us</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="body1">
              Welcome to LitHUB, your gateway to a world of literature and books. At LitHUB, we are passionate about connecting readers with their next favorite book and fostering a community of book enthusiasts.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Our Team</Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="body1">
              Meet the dedicated team behind LitHUB, each bringing unique insights and expertise to our mission:
            </Typography>
            <ul>
              <li><strong>John Doe</strong> - Founder & CEO</li>
              <li><strong>Jane Smith</strong> - Editor-in-Chief</li>
              <li><strong>Michael Johnson</strong> - Lead Developer</li>
            </ul>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Our Mission</Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="body1">
              At LitHUB, our mission is to inspire a love for reading and learning through curated book recommendations, engaging content, and a vibrant community.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>Contact Us</Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="body1">
              Have questions or feedback? Feel free to reach out to us at <a href="mailto:info@lithub.com">info@lithub.com</a>. Follow us on social media for updates and book recommendations!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AboutUsPage;
