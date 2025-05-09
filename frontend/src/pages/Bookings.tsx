import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  DirectionsCar,
  AccessTime,
  LocationOn,
  Download,
  Cancel,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);
const MotionBox = motion(Box);

interface Booking {
  id: string;
  parkingLotName: string;
  address: string;
  spotNumber: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
  totalAmount: number;
}

const Bookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Load only active bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings.filter((b: Booking) => b.status === 'active'));

    // Real-time updates across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'bookings') {
        const updated = JSON.parse(e.newValue || '[]').filter((b: Booking) => b.status === 'active');
        setBookings(updated);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleCancelBooking = (bookingId: string) => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = storedBookings.filter((booking: Booking) => booking.id !== bookingId);
    const cancelledBooking = storedBookings.find((booking: Booking) => booking.id === bookingId);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings.filter((b: Booking) => b.status === 'active'));

    // Move cancelled booking to history
    if (cancelledBooking) {
      const history = JSON.parse(localStorage.getItem('history') || '[]');
      const cancelled = { ...cancelledBooking, status: 'cancelled' as const };
      localStorage.setItem('history', JSON.stringify([cancelled, ...history]));
    }
  };

  const handleDownloadTicket = (booking: Booking) => {
    // Create ticket content
    const ticketContent = `
      Smart Parking Ticket
      -------------------
      Booking ID: ${booking.id}
      Parking Lot: ${booking.parkingLotName}
      Address: ${booking.address}
      Spot Number: ${booking.spotNumber}
      Start Time: ${booking.startTime}
      End Time: ${booking.endTime}
      Total Amount: ₹${booking.totalAmount}
      Status: ${booking.status}
    `;
    // Create and download file
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `parking-ticket-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'text.primary', mb: 4 }}>
            My Bookings
          </Typography>
        </MotionBox>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <Grid container spacing={3}>
            {bookings.length === 0 && (
              <Typography variant="body1" sx={{ color: 'text.secondary', ml: 2 }}>
                No active bookings.
              </Typography>
            )}
            {bookings.map((booking) => (
              <div key={booking.id} style={{ width: '100%' }}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{ bgcolor: 'background.paper', color: 'text.primary', border: '1px solid #e0e0e0', mb: 2 }}
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        {booking.parkingLotName}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {booking.address}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Spot: {booking.spotNumber}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        {booking.startTime} - {booking.endTime}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        ₹{booking.totalAmount}
                      </Typography>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        onClick={() => handleDownloadTicket(booking)}
                        sx={{ color: 'primary.main', borderColor: 'primary.main', '&:hover': { bgcolor: 'background.paper' } }}
                      >
                        Download
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Cancel />}
                        onClick={() => handleCancelBooking(booking.id)}
                        sx={{ ml: 2, borderColor: 'error.main', color: 'error.main', '&:hover': { bgcolor: 'background.paper' } }}
                      >
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Bookings; 