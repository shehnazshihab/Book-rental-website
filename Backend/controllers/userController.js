const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();



// Register a new user
const registerUser = async (req, res) => {
    const { name, place, age, email, education, contact, termsAccepted, password } = req.body;
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            name,
            place,
            age,
            email,
            education,
            contact,
            termsAccepted,
            password,
        });

        // Save the new user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        // Handle errors
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user is an admin based on predefined credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ message: 'Admin login successful', token, role: 'admin' });
        }

        // If not admin, proceed with regular user login
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare password directly (assuming no hashing)
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, role: 'user' });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ error: 'Error logging in user' });
    }
};

// Fetch user profile from database excluding password
const getUserProfile = async (req, res) => {
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
};

// Update user profile
const updateUserProfile = async (req, res) => {
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
};

// Delete user profile
const deleteUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await User.findByIdAndDelete(req.user.id);

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user profile:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
    try {
        // Extract the user ID from the request parameters
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findById(userId);

        // Check if the user was found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await User.findByIdAndDelete(userId);

        // Send a success response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};



// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};



// Get count of rentedBooks for a user
const getRentedBookCount = async (req, res) => {
    try {
        const userId = req.user.id;

        // Validate the ID format
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid user ID format' });
        }

        // Find the user by ID and select only the rentedBooks field
        const user = await User.findById(userId).select('rentedBooks');
        
        // Check if the user was found
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate the count of rented books
        const rentedBookCount = user.rentedBooks.length;

        // Return only the count in the response
        res.json({ rentedBookCount });
    } catch (error) {
        console.error('Error getting rented book count:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};



// Fetch rented books
const fetchRentedBooks = async (req, res) => {
    try {
        // Find the user by ID
        const user = await User.findById(req.user.id).populate('rentedBooks');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ rentedBooks: user.rentedBooks });
    } catch (error) {
        console.error('Error fetching rented books:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};



// Update rentedBooks in user profile
const updateRentedBooks = async (req, res) => {

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.rentedBooks.includes(bookId)) {
            user.rentedBooks.push(bookId);

            await user.save();
        }

        res.json({ message: 'Rented books updated successfully', rentedBooks: user.rentedBooks });
    } catch (error) {
        console.error('Error updating rented books:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
};




module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile, getAllUsers, deleteUserById, getRentedBookCount ,fetchRentedBooks,updateRentedBooks};

