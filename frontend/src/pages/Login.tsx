import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Link,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const MotionPaper = motion(Paper);

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Mock login - replace with actual API call
      if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
        login({ email: formData.email, role: 'admin' });
        navigate('/dashboard');
      } else if (formData.email === 'user@example.com' && formData.password === 'user123') {
        login({ email: formData.email, role: 'user' });
        navigate('/dashboard');
      } else if ((formData.email === 'jk123' || formData.email === 'jk123@gmail.com') && formData.password === '1234') {
        login({ email: formData.email, role: 'user' });
        navigate('/dashboard');
      } else if ((formData.email === 'ayu123' || formData.email === 'ayu123@example.com') && formData.password === '1234') {
        login({ email: formData.email, role: 'user' });
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred during login');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login; 