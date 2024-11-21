import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Layout from './components/layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#150b2e',
      light: '#2a1654',
      dark: '#0d0720',
    },
    secondary: {
      main: '#6236a0',
      light: '#7c43bd',
      dark: '#4a2980',
    },
    background: {
      default: '#f8f4fc',
      paper: '#ffffff',
    },
    text: {
      primary: '#150b2e',
      secondary: '#4a4a4a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#150b2e',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
        contained: {
          background: 'linear-gradient(135deg, #2a1654 0%, #150b2e 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #321963 0%, #1c1039 100%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #2a1654 0%, #150b2e 100%)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
