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
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          User Profile
        </Typography>
      </Box>
      <Card sx={{ mb: 4 }}>
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
              />
              <TextField
                label="Place"
                name="place"
                value={user.place}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Age"
                name="age"
                value={user.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={user.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Education"
                name="education"
                value={user.education}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Contact"
                name="contact"
                value={user.contact}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
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
                Name: {user.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Place: {user.place}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Age: {user.age}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Email: {user.email}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Education: {user.education}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Contact: {user.contact}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditToggle}
                sx={{
                  backgroundColor: '#76ABAE',
                  mt: 3,
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
        <Typography variant="body2" color="error" gutterBottom>
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default UserProfile;
