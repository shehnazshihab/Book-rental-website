import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Navbar = ({ isLoggedIn, isAdmin, handleLogout }) => {
  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    localStorage.removeItem('adminToken');
    handleLogout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#222831', color: '#EEEEEE', fontFamily: 'Poppins, sans-serif' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <Typography variant="h6" sx={{ color: '#EEEEEE' }}>
            LitHUB
          </Typography>
        </div>
        <div>
          <Button color="inherit" component={Link} to="/" sx={{ color: '#EEEEEE', '&:hover': { backgroundColor: '#76ABAE' }, marginRight: '25px' }}>Home</Button>
          {isLoggedIn && (
            <>
              <Button color="inherit" component={Link} to="/books" sx={{ color: '#EEEEEE', '&:hover': { backgroundColor: '#76ABAE' }, marginRight: '25px' }}>Books</Button>
              <Button color="inherit" component={Link} to="/genre" sx={{ color: '#EEEEEE', '&:hover': { backgroundColor: '#76ABAE' }, marginRight: '25px' }}>Genres</Button>
            </>
          )}
          <Button color="inherit" component={Link} to="/about-us" sx={{ color: '#EEEEEE', '&:hover': { backgroundColor: '#76ABAE' }, marginRight: '25px' }}>About Us</Button>
        </div>
        <div>
          {isLoggedIn ? (
            isAdmin ? (
              <>
                <Button color="inherit" component={Link} to="/admin-dashboard" sx={{ color: '#EEEEEE', '&:hover': { backgroundColor: '#76ABAE' }, marginRight: '15px' }}>Admin Dashboard</Button>
                <Button color="inherit" onClick={logoutAndRedirect} sx={{ color: '#EEEEEE', '&:hover': { backgroundColor: '#76ABAE' }, marginRight: '15px' }}>Logout</Button>
              </>
            ) : (
              <>
                <IconButton color="inherit" component={Link} to="/profile" sx={{ color: '#EEEEEE', marginRight: '15px' }}>
                  <AccountCircleIcon />
                </IconButton>
                <Button color="inherit" onClick={logoutAndRedirect} sx={{ color: '#EEEEEE', '&:hover': { backgroundColor: '#76ABAE' }, marginRight: '15px' }}>Logout</Button>
              </>
            )
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ color: '#EEEEEE', '&:hover': { backgroundColor: '#76ABAE' }, marginRight: '15px' }}>Login</Button>
              <Button variant="outlined" color="inherit" component={Link} to="/signup" sx={{ color: '#eeeeee', borderColor: '#76ABAE', '&:hover': { backgroundColor: '#76ABAE' }, textTransform: 'none', marginRight: '15px' }}>Sign Up</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
