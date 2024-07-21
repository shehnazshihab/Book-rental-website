import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Container, TextField } from '@mui/material';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const CheckoutPage = ({ isBookAvailable }) => {
  const { id } = useParams(); // Fetching the id parameter from the URL
  const [paymentDetails, setPaymentDetails] = useState('');
  const [checkoutError, setCheckoutError] = useState('');

  const handleConfirmPayment = async () => {
    try {
      if (!paymentDetails) {
        setCheckoutError('Please provide payment details.');
        return;
      }

      // Proceed with updating book status using bookId (which is 'id' from URL params)
      const response = await axios.put(`http://localhost:3005/books/rental-status/${id}`, {
        available: false, // Assuming false means rented or not available
      });
      console.log('Book status updated:', response.data);

      // Additional logic to handle payment processing with paymentDetails
      console.log('Payment details:', paymentDetails);

      // Reset form and state after successful checkout
      setPaymentDetails('');
      setCheckoutError('');
    } catch (error) {
      console.error('Error confirming payment:', error);
      setCheckoutError('Failed to confirm payment. Please try again later.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Button
                  component={Link}
                  to="/books"
                  variant="contained"
                  color="secondary"
                  sx={{ marginBottom: '20px', backgroundColor: '#76ABAE', fontSize:10,color: '#222831', '&:hover': { backgroundColor: '#DDDDDD',color:"#222831" } }}
                >
                  Back to Books
                </Button>
              </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
              Checkout
            </Typography>
            <Typography variant="body1" paragraph>
              Provide your payment details and confirm your rental:
            </Typography>
            <TextField
              fullWidth
              label="Payment Details"
              margin="normal"
              value={paymentDetails}
              onChange={(e) => setPaymentDetails(e.target.value)}
              error={!!checkoutError}
              helperText={checkoutError}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '20px', backgroundColor: '#222831', color: '#FFFFFF', '&:hover': { backgroundColor: '#1A1D24' } }}
              onClick={handleConfirmPayment}
            >
              Confirm Payment
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
