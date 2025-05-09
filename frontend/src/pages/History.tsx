import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

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

const History: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    // Function to load history from localStorage
    const loadHistory = () => {
      const storedHistory = JSON.parse(localStorage.getItem('history') || '[]');
      setBookings(storedHistory);
    };
    loadHistory();

    // Real-time updates across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'history') {
        loadHistory();
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // Update when page regains focus
    const handleFocus = () => {
      loadHistory();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatDateTime = (dateTime: string) => {
    // Try to parse as date, fallback to original string if invalid
    const parsed = new Date(dateTime);
    if (!isNaN(parsed.getTime())) {
      return parsed.toLocaleString();
    }
    return dateTime;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
        Booking History
      </Typography>

      <MotionPaper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Parking Lot</TableCell>
                <TableCell>Spot</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Receipt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No booking history found.
                  </TableCell>
                </TableRow>
              )}
              {bookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.id}</TableCell>
                  <TableCell>{booking.parkingLotName}</TableCell>
                  <TableCell>{booking.spotNumber}</TableCell>
                  <TableCell>{formatDateTime(booking.startTime)}</TableCell>
                  <TableCell>{formatDateTime(booking.endTime)}</TableCell>
                  <TableCell>
                    <Chip
                      label={booking.status}
                      color={getStatusColor(booking.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>₹{booking.totalAmount}</TableCell>
                  <TableCell>
                    <Tooltip title="Download Receipt">
                      <IconButton
                        size="small"
                        color="primary"
                        disabled={booking.status === 'cancelled'}
                      >
                        <ReceiptIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MotionPaper>
    </Container>
  );
};

export default History; 