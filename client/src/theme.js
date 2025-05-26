import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#FFFFFF', // White
      light: '#F5F5F5',
      dark: '#E0E0E0',
      contrastText: '#000000',
    },
    background: {
      default: '#FFFFFF', // White background
      paper: '#F5F5F5', // Light gray for paper elements
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Press Start 2P", cursive',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      textShadow: '3px 3px 0px #000',
      letterSpacing: '0.1em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      textShadow: '2px 2px 0px #000',
      letterSpacing: '0.05em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      textShadow: '2px 2px 0px #000',
      letterSpacing: '0.05em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.05em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'none',
          padding: '12px 24px',
          border: '3px solid #000',
          boxShadow: '4px 4px 0px #000',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translate(2px, 2px)',
            boxShadow: '2px 2px 0px #000',
            backgroundColor: '#000',
            color: '#fff',
          },
          '&.Mui-disabled': {
            border: '3px solid #ccc',
            boxShadow: '4px 4px 0px #ccc',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '3px solid #000',
          boxShadow: '4px 4px 0px #000',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '6px 6px 0px #000',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            border: '3px solid #000',
            boxShadow: '4px 4px 0px #000',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow: '6px 6px 0px #000',
            },
            '&.Mui-focused': {
              boxShadow: '6px 6px 0px #000',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 0 #000',
        },
      },
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme; 