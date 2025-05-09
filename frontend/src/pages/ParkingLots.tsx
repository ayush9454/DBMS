import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Search, DirectionsCar } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import BookingConfirmation from '../components/BookingConfirmation';
import api from '../config/api';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

interface ParkingLot {
  id: number;
  name: string;
  address: string;
  availableSpots: number;
  totalSpots: number;
  rate: number;
}

const ParkingLots: React.FC = () => {
  const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLot, setSelectedLot] = useState<ParkingLot | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);

  useEffect(() => {
    fetchParkingLots();
  }, []);

  const fetchParkingLots = async () => {
    try {
      setLoading(true);
      const response = await api.get('/parking-lots');
      setParkingLots(response.data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch parking lots. Please try again later.');
      console.error('Error fetching parking lots:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredLots = parkingLots.filter(lot =>
    lot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lot.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBookNow = (lot: ParkingLot) => {
    setSelectedLot(lot);
    setShowBookingDialog(true);
  };

  const handleCloseBookingDialog = () => {
    setShowBookingDialog(false);
    setSelectedLot(null);
  };

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
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Available Parking Lots
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 4 }}
        />
      </Box>

      <Grid container spacing={3}>
        <AnimatePresence>
          {filteredLots.map((lot) => (
            <Grid item xs={12} sm={6} md={4} key={lot.id}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {lot.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {lot.address}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DirectionsCar sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      {lot.availableSpots} spots available out of {lot.totalSpots}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ₹{lot.rate.toFixed(2)}/hour
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleBookNow(lot)}
                    disabled={lot.availableSpots === 0}
                  >
                    {lot.availableSpots === 0 ? 'No Spots Available' : 'Book Now'}
                  </Button>
                </CardActions>
              </MotionCard>
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      {selectedLot && (
        <BookingConfirmation
          open={showBookingDialog}
          onClose={handleCloseBookingDialog}
          parkingLot={selectedLot}
        />
      )}
    </Container>
  );
};

export default ParkingLots; 