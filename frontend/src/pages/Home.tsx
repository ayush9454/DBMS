import React from 'react';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #635BFF 0%, #4B44C0 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', alignItems: 'center' }}>
            <div style={{ flex: '1 1 400px' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component="img"
                  src="/smart-parking-logo.svg"
                  alt="Smart Parking Logo"
                  sx={{
                    height: 40,
                    mb: 4,
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    fontWeight: 700,
                    mb: 2,
                  }}
                >
                  Smart Parking Made Simple
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    opacity: 0.9,
                    fontWeight: 400,
                  }}
                >
                  Find and book parking spots instantly. Save time and avoid the hassle of searching for parking.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/parking-lots')}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                      },
                    }}
                  >
                    Find Parking
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </motion.div>
            </div>
            <div style={{ flex: '1 1 400px' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src="/parking-illustration.svg"
                  alt="Smart Parking"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    height: 'auto',
                    display: { xs: 'none', md: 'block' },
                  }}
                />
              </motion.div>
            </div>
          </div>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ mb: 6, fontWeight: 700 }}
        >
          Why Choose Us?
        </Typography>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          {features.map((feature, index) => (
            <div key={index} style={{ flex: '1 1 300px' }}>
              <MotionPaper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Box
                  component="img"
                  src={feature.icon}
                  alt={feature.title}
                  sx={{
                    width: 48,
                    height: 48,
                    mb: 2,
                  }}
                />
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </MotionPaper>
            </div>
          ))}
        </div>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 8, md: 12 },
        }}
      >
        <Container maxWidth="lg">
          <div style={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 3, fontWeight: 700 }}>
              Ready to Get Started?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of users who are already using our smart parking system.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Sign In
            </Button>
          </div>
        </Container>
      </Box>
    </Box>
  );
};

const features = [
  {
    title: 'Real-time Availability',
    description: 'Check parking spot availability in real-time and book instantly. No more circling around looking for a spot.',
    icon: '/icons/real-time.svg',
  },
  {
    title: 'Secure Payments',
    description: 'Multiple payment options with secure transactions. Your payment information is always protected.',
    icon: '/icons/secure.svg',
  },
  {
    title: 'Easy Management',
    description: 'Manage your bookings, payments, and parking history all in one place. Stay organized and in control.',
    icon: '/icons/convenient.svg',
  },
];

export default Home; 