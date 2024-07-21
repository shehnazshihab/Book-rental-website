import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    
    <Container
      sx={{
        height: '100vh',
        width :'100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage: 'url(https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        style={{ color: '#27374D', fontWeight: 'bold', marginTop: 20 }}
      >
        ADMIN DASHBOARD
      </Typography>
      
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/user-management"
            sx={{
              backgroundColor: '#222831',
              '&:hover': { backgroundColor: '#31363F' },
              width: '200px',
              height: '60px',
              fontSize: '18px',
              
            }}
          >
            User Management
          </Button>

          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/book-management"
            sx={{
              backgroundColor: '#222831',
              '&:hover': { backgroundColor: '#31363F' },
              width: '200px',
              height: '60px',
              fontSize: '18px',
            }}
          >
            Book Management
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AdminDashboard;