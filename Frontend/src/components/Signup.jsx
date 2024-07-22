import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Link, Box, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [education, setEducation] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Submitting with data:", { name, place, age, email, education, contact, password, termsAccepted });

    if (name && place && age && email && education && contact && password && termsAccepted) {
      try {
        const response = await axios.post('http://localhost:3005/users/register', {
          name,
          place,
          age,
          email,
          education,
          contact,
          password,
          termsAccepted,
        });

        console.log("Response:", response);

        if (response.status === 201) {
          setSuccess('User registered successfully. Redirecting to login...');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        } else {
          setError('Registration failed. Please try again.');
        }
      } catch (err) {
        console.error("Registration error:", err);
        setError('Registration failed. Please try again.');
      }
    } else {
      setError('Please fill in all fields and accept the terms and conditions.');
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
        backgroundColor: '#EEEEEE', 
      }}>
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Typography variant="h4" gutterBottom style={{ color: '#222831' }}>
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#222831',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#76ABAE',
                },
              },
              '& input': { backgroundColor: '#f7f7f7' }, 
            }}
            InputLabelProps={{
              sx: {
                color: '#31363F',
                '&.Mui-focused': {
                  color: '#222831',
                },
              },
            }}
          />
          <TextField
            label="Place"
            fullWidth
            margin="normal"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            required
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#222831',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#76ABAE',
                },
              },
              '& input': { backgroundColor: '#f7f7f7' }, 
            }}
            InputLabelProps={{
              sx: {
                color: '#31363F',
                '&.Mui-focused': {
                  color: '#222831',
                },
              },
            }}
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            margin="normal"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#222831',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#76ABAE',
                },
              },
              '& input': { backgroundColor: '#f7f7f7' }, 
            }}
            InputLabelProps={{
              sx: {
                color: '#31363F',
                '&.Mui-focused': {
                  color: '#222831',
                },
              },
            }}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#222831',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#76ABAE',
                },
              },
              '& input': { backgroundColor: '#f7f7f7' }, 
            }}
            InputLabelProps={{
              sx: {
                color: '#31363F',
                '&.Mui-focused': {
                  color: '#222831',
                },
              },
            }}
          />
          <TextField
            label="Education"
            fullWidth
            margin="normal"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            required
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#222831',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#76ABAE',
                },
              },
              '& input': { backgroundColor: '#f7f7f7' },
            }}
            InputLabelProps={{
              sx: {
                color: '#31363F',
                '&.Mui-focused': {
                  color: '#222831',
                },
              },
            }}
          />
          <TextField
            label="Contact Number"
            type="tel"
            fullWidth
            margin="normal"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#222831',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#76ABAE',
                },
              },
              '& input': { backgroundColor: '#f7f7f7' }, 
            }}
            InputLabelProps={{
              sx: {
                color: '#31363F',
                '&.Mui-focused': {
                  color: '#222831',
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
            sx={{ 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#222831',
                },
                '&:hover fieldset': {
                  borderColor: '#76ABAE',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#76ABAE',
                },
              },
              '& input': { backgroundColor: '#f7f7f7' }, 
            }}
            InputLabelProps={{
              sx: {
                color: '#31363F',
                '&.Mui-focused': {
                  color: '#222831',
                },
              },
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                sx={{
                  color: '#76ABAE',
                  '&.Mui-checked': {
                    color: '#76ABAE',
                  },
                }}
              />
            }
            label="I accept the terms and conditions."
            sx={{ mt: 3, mb: 3, color: '#31363F' }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: '#76ABAE',
              color: '#EEEEEE',
              '&:hover': {
                backgroundColor: '#222831',
              },
            }}
          >
            Sign Up
          </Button>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Already have an account? <Link href="/login" variant="body2">Log In</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
