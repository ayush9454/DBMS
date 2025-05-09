import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search, DirectionsCar } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import BookingConfirmation from '../components/BookingConfirmation';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

// Mock data - replace with API call
const mockParkingLots = [
  {
    id: 1,
    name: 'MG Road Parking',
    address: 'MG Road, Bangalore, Karnataka 560001',
    availableSpots: 15,
    totalSpots: 50,
    rate: 50.00,
  },
  {
    id: 2,
    name: 'Koramangala Plaza',
    address: '8th Block, Koramangala, Bangalore, Karnataka 560034',
    availableSpots: 8,
    totalSpots: 30,
    rate: 40.00,
  },
  {
    id: 3,
    name: 'Indiranagar Complex',
    address: '100 Feet Road, Indiranagar, Bangalore, Karnataka 560038',
    availableSpots: 20,
    totalSpots: 100,
    rate: 45.00,
  },
  {
    id: 4,
    name: 'Whitefield Tech Park',
    address: 'ITPL Road, Whitefield, Bangalore, Karnataka 560066',
    availableSpots: 25,
    totalSpots: 75,
    rate: 35.00,
  },
  {
    id: 5,
    name: 'Electronic City',
    address: 'Phase 1, Electronic City, Bangalore, Karnataka 560100',
    availableSpots: 18,
    totalSpots: 60,
    rate: 30.00,
  },
];

const ParkingLots: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLot, setSelectedLot] = useState<any>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingDuration, setBookingDuration] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const filteredLots = mockParkingLots.filter(
    (lot) =>
      lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lot.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookNow = (lot: any) => {
    setSelectedLot(lot);
    setBookingDialogOpen(true);
  };

  const handleConfirmBooking = () => {
    const spotNumber = `A${Math.floor(Math.random() * 100)}`;
    const startTime = new Date().toLocaleString();
    const endTime = new Date(Date.now() + bookingDuration * 60 * 60 * 1000).toLocaleString();
    const totalAmount = selectedLot.rate * bookingDuration;

    const bookingDetails = {
      id: `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      parkingLotName: selectedLot.name,
      address: selectedLot.address,
      spotNumber,
      startTime,
      endTime,
      duration: bookingDuration,
      totalAmount,
      status: 'active' as const,
    };

    // Store booking in localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const updatedBookings = [...existingBookings, bookingDetails];
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    setBookingDetails(bookingDetails);
    setBookingDialogOpen(false);
    setShowConfirmation(true);
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

  if (showConfirmation && bookingDetails) {
    return <BookingConfirmation bookingDetails={bookingDetails} />;
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: 'text.primary', mb: 4 }}
          >
            Available Parking Lots
          </Typography>
        </MotionBox>

        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search parking lots..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              mb: 4,
              bgcolor: 'background.paper',
              borderRadius: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#b3b3b3' }} />
                </InputAdornment>
              ),
            }}
          />
        </MotionBox>

        <Grid container spacing={3} component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
          {filteredLots.map((lot) => (
            <div key={lot.id} style={{ width: '100%' }}>
              <MotionCard
                whileHover={{ y: -10 }}
                sx={{
                  height: '100%',
                  bgcolor: 'background.paper',
                  borderRadius: 2,
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.3s ease-in-out',
                }}
              >
                <CardContent>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                      {lot.name}
                    </Typography>
                  </MotionBox>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    {lot.address}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Available Spots:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {lot.availableSpots}/{lot.totalSpots}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Rate:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      ₹{lot.rate}/hour
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<DirectionsCar />}
                    onClick={() => handleBookNow(lot)}
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }}
                  >
                    Book Now
                  </Button>
                </CardActions>
              </MotionCard>
            </div>
          ))}
        </Grid>

        <AnimatePresence>
          {bookingDialogOpen && (
            <Dialog
              open={bookingDialogOpen}
              onClose={() => setBookingDialogOpen(false)}
              PaperProps={{
                sx: {
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                },
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <DialogTitle>Book Parking Space</DialogTitle>
                <DialogContent>
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    sx={{ mt: 2 }}
                  >
                    <FormControl fullWidth sx={{ mb: 2 }}>
                      <InputLabel sx={{ color: 'text.secondary' }}>Duration (hours)</InputLabel>
                      <Select
                        value={bookingDuration}
                        onChange={(e) => setBookingDuration(Number(e.target.value))}
                        label="Duration (hours)"
                        sx={{
                          color: 'text.primary',
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'text.secondary',
                          },
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'primary.main',
                          },
                        }}
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 12, 24].map((hours) => (
                          <MenuItem key={hours} value={hours}>
                            {hours} {hours === 1 ? 'hour' : 'hours'}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      Total Amount: ₹{selectedLot?.rate * bookingDuration}
                    </Typography>
                  </MotionBox>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => setBookingDialogOpen(false)}
                    sx={{ color: 'text.secondary' }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    variant="contained"
                    sx={{
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark'
                      }
                    }}
                  >
                    Confirm Booking
                  </Button>
                </DialogActions>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
};

export default ParkingLots; 