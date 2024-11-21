import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
