import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    place: '',
    age: '',
    email: '',
    education: '',
    contact: '',
    termsAccepted: false,
    password: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3005/users/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('adminToken');
    try {
      const response = await axios.delete(`http://localhost:3005/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        // Handle success (e.g., show confirmation, update UI)
        console.log('User deleted successfully');
        fetchUsers(); // Fetch updated user list after deletion
      } else {
        console.error('Failed to delete user:', response.data);
        // Handle failure scenario
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error scenario
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post('http://localhost:3005/users/register', newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:3005/users/${editUserId}`, newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleClickOpen = (user = null) => {
    if (user) {
      setIsEditing(true);
      setEditUserId(user._id);
      setNewUser(user);
    } else {
      setIsEditing(false);
      setNewUser({
        name: '',
        place: '',
        age: '',
        email: '',
        education: '',
        contact: '',
        termsAccepted: false,
        password: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewUser({
      name: '',
      place: '',
      age: '',
      email: '',
      education: '',
      contact: '',
      termsAccepted: false,
      password: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  return (
    <Container>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom style={{ color: '#76ABAE', fontWeight: 'bold', marginBottom: 4 }}>
          USER MANAGEMENT
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClickOpen()}
          sx={{ mb: 4, backgroundColor: '#31363F', mt: 2, '&:hover': { backgroundColor: '#222831', color: '#EEEEEE' } }}
        >
          Add User
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Update User' : 'Add New User'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Name"
              type="text"
              fullWidth
              value={newUser.name}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="place"
              label="Place"
              type="text"
              fullWidth
              value={newUser.place}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="age"
              label="Age"
              type="number"
              fullWidth
              value={newUser.age}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={newUser.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="education"
              label="Education"
              type="text"
              fullWidth
              value={newUser.education}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="contact"
              label="Contact"
              type="text"
              fullWidth
              value={newUser.contact}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              value={newUser.password}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "#31363F" }}>
              Cancel
            </Button>
            <Button onClick={isEditing ? handleUpdateUser : handleAddUser} sx={{ color: "#31363F" }}>
              {isEditing ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ marginBottom: 4 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Place</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Email ID</TableCell>
                  <TableCell>Education</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.place}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.education}</TableCell>
                    <TableCell>{user.contact}</TableCell>
                    <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleClickOpen(user)}
                        sx={{ backgroundColor: '#31363F', '&:hover': { backgroundColor: '#222831', color: '#EEEEEE' } }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteUser(user._id)}
                        sx={{ backgroundColor: '#31363F', '&:hover': { backgroundColor: '#222831', color: '#EEEEEE' } }}
                      >
                        Delete
                      </Button>
                    </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        
      </Box>
    </Container>
  );
};

export default UserManagement;
