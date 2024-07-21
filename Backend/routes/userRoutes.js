const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile,getAllUsers ,deleteUserProfile, deleteUserById,getRentedBookCount,fetchRentedBooks,updateRentedBooks} = require('../controllers/userController');
const auth = require('../middleware/auth');
const User = require('../models/user');


// Register a new user
router.post('/register', registerUser);



// Register a new user
router.post('/register', async (req, res) => {
  try {
      const newUser = new User(req.body);
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to register user' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
  } catch (error) {
      console.error('Error getting user profile:', error.message);
      res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  const { name, place, age, education, contact } = req.body;
  try {
      const user = await User.findById(req.user.id);
      if (!user) {
          return res.status(404).json({ error: 'User not found' });
      }

      // Update user object
      user.name = name;
      user.place = place;
      user.age = age;
      user.education = education;
      user.contact = contact;

      // Save updated user object
      await user.save();

      res.json({ message: 'User profile updated successfully', user });
  } catch (error) {
      console.error('Error updating user profile:', error.message);
      res.status(500).json({ error: 'Server error' });
  }
});


// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = req.body;
    await User.findByIdAndUpdate(userId, updatedUser);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Get all users
router.get('/users',getAllUsers);

// Login a user
router.post('/login', loginUser);

// Get user profile
router.get('/profile', auth, getUserProfile);

// Update user profile
router.put('/profile', auth, updateUserProfile);

// Delete user profile
router.delete('/profile', auth, deleteUserProfile);

// Deleting user by id
router.delete('/users/:id', deleteUserById);

// Define the route to update rented books
router.put('/update-rented-books/:bookId', auth, updateRentedBooks);

// Get the rented book count
router.get('/rented-book-count', auth, getRentedBookCount);

//Get the rented books
router.get('/rented-books', auth, fetchRentedBooks);

module.exports = router;
