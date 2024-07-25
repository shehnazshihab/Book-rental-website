import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, Box, TextField } from '@mui/material';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: '',
    place: '',
    age: 0,
    email: '',
    education: '',
    contact: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3005/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again.');
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:3005/users/profile', user, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
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
     <Container maxWidth="md" sx={{ mt: 6 }}> {/* Adjusted margin-top */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, Arial, sans-serif' }}>
            User Profile
          </Typography>
        </Box>
        <Card sx={{ mb: 4, boxShadow: 5, borderRadius: 2, backgroundColor: '#FFFFFF' }}>
          <CardContent>
            {isEditing ? (
              <>
                <TextField
                  label="Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Place"
                  name="place"
                  value={user.place}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Age"
                  name="age"
                  value={user.age}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Education"
                  name="education"
                  value={user.education}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Contact"
                  name="contact"
                  value={user.contact}
                  onChange={handleChange}
                  fullWidth
                  margin="normal"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleUpdate}
                  sx={{
                    mt: 3,
                    backgroundColor: '#76ABAE',
                    color: '#EEEEEE',
                    '&:hover': { backgroundColor: '#5f9195' }
                  }}
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Place:</strong> {user.place}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Age:</strong> {user.age}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Email:</strong> {user.email}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Education:</strong> {user.education}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  <strong>Contact:</strong> {user.contact}
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleEditToggle}
                  sx={{
                    mt: 3,
                    backgroundColor: '#76ABAE',
                    color: '#EEEEEE',
                    '&:hover': { backgroundColor: '#5f9195' }
                  }}
                >
                  Edit
                </Button>
              </>
            )}
          </CardContent>
        </Card>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default UserProfile;
