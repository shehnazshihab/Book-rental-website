import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Link, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsLoggedIn, setIsAdmin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:3005/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, role } = response.data;
        localStorage.setItem('token', token); // Store the token in localStorage

        if (role === 'admin') {
          setIsAdmin(true);
          setIsLoggedIn(true);
          navigate('/admin-dashboard'); // Redirect to admin dashboard upon successful login
        } else {
          setIsAdmin(false);
          setIsLoggedIn(true);
          navigate('/'); // Redirect to homepage for regular users
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{
        mt: 8,
        p: 4,
        boxShadow: 3,
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: '#76ABAE',
      }}>
        <Typography variant="h4" gutterBottom style={{ color: '#222831' }}>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            InputProps={{ style: { backgroundColor: '#f7f7f7' } }}
            InputLabelProps={{
              sx: {
                '&.Mui-focused': {
                  color: '#222831',
                },
              },
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#31363F',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#222831',
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            InputProps={{ style: { backgroundColor: '#f7f7f7' } }}
            InputLabelProps={{
              sx: {
                '&.Mui-focused': {
                  color: '#222831',
                },
              },
            }}
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#31363F',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#222831',
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              mt: 3,
              backgroundColor: '#222831',
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: '#EEEEEE',
                color: '#222831',
              },
            }}
          >
            Login
          </Button>
        </form>
        <Typography variant="body2" sx={{ mt: 2, color: '#31363F' }}>
          Don't have an account? <Link href="/signup" sx={{ color: '#222831' }}>Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
