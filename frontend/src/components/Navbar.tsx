import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer', color: 'primary.main' }}
          onClick={() => navigate('/')}
        >
          Smart Parking
        </Typography>
        <Box>
          {user ? (
            <>
              <Button color="inherit" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
              <Button color="inherit" onClick={() => navigate('/parking-lots')}>
                Parking Lots
              </Button>
              <Button color="inherit" onClick={() => navigate('/bookings')}>
                My Bookings
              </Button>
              <Button color="inherit" onClick={() => navigate('/history')}>
                History
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 