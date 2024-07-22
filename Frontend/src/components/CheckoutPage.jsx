import React, { useState } from 'react';
import { Grid, Paper, Typography, Button, Container, Alert } from '@mui/material';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const CheckoutPage = () => {
  const { id } = useParams();
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleConfirmPayment = async () => {
    try {
      const response = await axios.put(`http://localhost:3005/books/rental-status/${id}`, {
        available: false,
      });
      console.log('Book status updated:', response.data);
      setSuccessMessage('The book is rented successfully!');
      setPaymentConfirmed(true);
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
            {paymentConfirmed && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Button
                  component={Link}
                  to="/books"
                  variant="contained"
                  color="secondary"
                  sx={{
                    marginBottom: '20px',
                    backgroundColor: '#76ABAE',
                    fontSize: 10,
                    color: '#222831',
                    '&:hover': { backgroundColor: '#DDDDDD', color: '#222831' },
                  }}
                >
                  Back to Books
                </Button>
              </Grid>
            </Grid>
            <Typography variant="h5" gutterBottom>
              Checkout
            </Typography>
            <Typography variant="body1" paragraph>
              {paymentConfirmed ? "Your book has been rented successfully!" : "Confirm your rental by clicking the button below:"}
            </Typography>
            {!paymentConfirmed && (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  marginTop: '20px',
                  backgroundColor: '#222831',
                  color: '#FFFFFF',
                  '&:hover': { backgroundColor: '#1A1D24' },
                }}
                onClick={handleConfirmPayment}
                disabled={paymentConfirmed}
              >
                Confirm Payment
              </Button>
            )}
            {checkoutError && (
              <Typography color="error" sx={{ mt: 2 }}>
                {checkoutError}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CheckoutPage;
