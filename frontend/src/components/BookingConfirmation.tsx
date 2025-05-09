import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import { motion } from 'framer-motion';
import api from '../config/api';

interface ParkingLot {
  id: number;
  name: string;
  address: string;
  availableSpots: number;
  totalSpots: number;
  rate: number;
}

interface BookingConfirmationProps {
  open: boolean;
  onClose: () => void;
  parkingLot: ParkingLot;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  open,
  onClose,
  parkingLot,
}) => {
  const [duration, setDuration] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.post('/bookings', {
        parkingLotId: parkingLot.id,
        duration,
      });

      // Handle successful booking
      onClose();
      // You might want to trigger a refresh of the parking lots list here
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Book Parking Space</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            {parkingLot.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            {parkingLot.address}
          </Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Duration (hours)</InputLabel>
            <Select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              label="Duration (hours)"
            >
              {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((hours) => (
                <MenuItem key={hours} value={hours}>
                  {hours} {hours === 1 ? 'hour' : 'hours'}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            Total Amount: ₹{(parkingLot.rate * duration).toFixed(2)}
          </Typography>

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirmBooking}
          variant="contained"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingConfirmation; 