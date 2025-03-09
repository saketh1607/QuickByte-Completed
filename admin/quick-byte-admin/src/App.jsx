import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import TimeSlotList from './components/TimeSlotList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ErrorBoundary from './components/ErrorBoundary';
import InventoryManagement from './components/InventoryManagement'; 
import Button from '@mui/material/Button';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              QuickBite Admin Panel
            </Typography>
            <>
              <Button color="inherit" href="/inventory">
                Inventory
              </Button>
              <Button color="inherit" href="/time-slots">
                Time Slots
              </Button>
            </>
          </Toolbar>
        </AppBar>

        <div className="app-container">
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Navigate to="/time-slots" replace />} />
              <Route path="/time-slots" element={<TimeSlotList />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;