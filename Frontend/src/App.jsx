import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import BookListPage from './components/BookList';
import BookDetails from './components/BookDetails';
import UserProfile from './components/UserProfile';
import AdminDashboard from './components/AdminDashboard';
import GenrePage from './components/Genres';
import AboutUsPage from './components/AboutUs';
import CheckoutPage from './components/CheckoutPage';
import UserManagement from './components/UserManagement';
import BookManagement from './components/BookManagement';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user was previously logged in (e.g., from localStorage)
    const userLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userIsAdmin = localStorage.getItem('isAdmin') === 'true';

    if (userLoggedIn) {
      setIsLoggedIn(true);
      setIsAdmin(userIsAdmin);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    // Clear localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isAdmin');
  };

  // Function to render login page if not logged in
  const ProtectedRoute = ({ element, ...rest }) => {
    if (isLoggedIn) {
      return element;
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAdmin={setIsAdmin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books" element={<ProtectedRoute element={<BookListPage />} />} />
        <Route path="/books/:id" element={<ProtectedRoute element={<BookDetails />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
        <Route path="/genre" element={<GenrePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/books/:id/checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
        <Route path="/admin/user-management" element={<ProtectedRoute element={<UserManagement />} />} />
        <Route path="/admin/book-management" element={<ProtectedRoute element={<BookManagement />} />} />
      </Routes>
    </Router>
  );
};

export default App;
