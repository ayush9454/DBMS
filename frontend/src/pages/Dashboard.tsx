import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
} from '@mui/material';
import { DirectionsCar, AccessTime, AttachMoney } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import api from '../config/api';

interface Booking {
  id: string;
  parkingLotName: string;
  address: string;
  spotNumber: string;
  startTime: string;
  endTime: string;
  duration: number;
  amount: number;
  status: 'active' | 'completed' | 'cancelled';
}

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await api.get('/bookings');
      setBookings(response.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch bookings. Please try again later.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalSpent = () => {
    const validBookings = bookings.filter(b => 
      (b.status === 'active' || b.status === 'completed') && 
      typeof b.amount === 'number' && 
      !isNaN(b.amount)
    );
    return validBookings.reduce((total, booking) => total + booking.amount, 0);
  };

  const stats = [
    {
      title: 'Active Bookings',
      value: bookings.filter(b => b.status === 'active').length,
      icon: <DirectionsCar sx={{ fontSize: 40 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Hours Parked',
      value: bookings.reduce((total, booking) => {
        const start = new Date(booking.startTime);
        const end = new Date(booking.endTime);
        return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      }, 0).toFixed(1),
      icon: <AccessTime sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.main,
    },
    {
      title: 'Total Spent',
      value: `₹${calculateTotalSpent().toFixed(2)}`,
      icon: <AttachMoney sx={{ fontSize: 40 }} />,
      color: theme.palette.success.main,
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" sx={{ mt: 4, textAlign: 'center' }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} component="div">
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: stat.color, mr: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" sx={{ color: stat.color }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" gutterBottom>
        Recent Bookings
      </Typography>

      <Grid container spacing={3}>
        {bookings.slice(0, 3).map((booking) => (
          <Grid item xs={12} key={booking.id} component="div">
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {booking.parkingLotName}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {booking.address}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Spot: {booking.spotNumber}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Duration: {booking.duration} hours
                  </Typography>
                  <Typography variant="body2" color="primary">
                    ₹{booking.amount.toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard; 