import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Divider,
  Grid,
} from '@mui/material';
import {
  DirectionsCar,
  AccessTime,
  LocationOn,
  Payment,
  QrCode2,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface BookingConfirmationProps {
  bookingDetails: {
    parkingLotName: string;
    address: string;
    bookingId: string;
    startTime: string;
    endTime: string;
    duration: number;
    totalAmount: number;
    spotNumber: string;
  };
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ bookingDetails }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8 }}>
      <Paper elevation={6} sx={{ p: 5, maxWidth: 420, width: '100%', bgcolor: 'background.paper', color: 'text.primary', borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          Booking Confirmed!
        </Typography>
        <Typography align="center" sx={{ mb: 3, color: 'text.secondary' }}>
          Your parking space has been reserved
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 2 }}>
            <QrCode2 sx={{ fontSize: 48, color: '#fff' }} />
          </Box>
        </Box>
        <Typography align="center" sx={{ mb: 2, color: 'text.secondary' }}>
          Booking ID:
        </Typography>
        <Typography align="center" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
          {bookingDetails.bookingId}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
            {bookingDetails.parkingLotName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {bookingDetails.address}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Spot Number
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {bookingDetails.spotNumber}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Duration
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.primary' }}>
              {bookingDetails.duration} hours
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total Amount
            </Typography>
            <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 600 }}>
              ₹{bookingDetails.totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate('/dashboard')}
            sx={{ borderColor: 'primary.main', color: 'primary.main', '&:hover': { bgcolor: 'background.paper' } }}
          >
            View in Dashboard
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => window.print()}
            sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            Download Ticket
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BookingConfirmation; 