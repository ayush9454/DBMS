import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#635BFF',
      light: '#8078FF',
      dark: '#4B44C0',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0A2540',
      light: '#1A3B5C',
      dark: '#051A2E',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F7FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1F36',
      secondary: '#697386',
    },
    error: {
      main: '#FF4B4B',
    },
    success: {
      main: '#00C853',
    },
    warning: {
      main: '#FFB800',
    },
    info: {
      main: '#00B8D9',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.2,
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.2,
    },
    subtitle1: {
      fontSize: '1rem',
      lineHeight: 1.5,
      color: '#697386',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          textTransform: 'none',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid #E5E7EB',
        },
      },
    },
  },
});

export default theme; 