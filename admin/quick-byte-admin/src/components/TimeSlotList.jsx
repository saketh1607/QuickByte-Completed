import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Paper,
  Chip,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import QRScanner from './QRScanner';

const TimeSlotList = () => {
  const [orders, setOrders] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedOrders, setCheckedOrders] = useState([]);
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
    totalAmount: 0,
    mostSoldItems: [],
  });
  const [inventory, setInventory] = useState([]); 
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0 }); 


  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders/metrics');
      setMetrics(response.data);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    }
  };


  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get('http://localhost:5000/api/orders', {
        timeout: 10000,
      });

      if (response.status === 200 && Array.isArray(response.data)) {
        const pendingOrders = response.data.filter((order) => order?.status === 'pending');
        setOrders(pendingOrders);
        await fetchMetrics();
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      setError(error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };


  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/inventory');
      setInventory(response.data);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
    }
  };


  const addInventoryItem = async () => {
    if (!newItem.name || newItem.quantity <= 0 || newItem.price <= 0) {
      setError('Please fill all fields correctly');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/inventory', newItem);
      setInventory([...inventory, response.data]);
      setNewItem({ name: '', quantity: 0, price: 0 });
    } catch (error) {
      setError('Failed to add item. Please try again.');
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchInventory(); 
    const interval = setInterval(fetchOrders, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = async (orderId) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}`, {
        status: 'completed',
      });

      setCheckedOrders((prev) => [...prev, orderId]);
      setOrders((prev) => prev.filter((order) => order.orderId !== orderId));
      await fetchMetrics();
    } catch (error) {
      setError('Failed to update order status. Please try again.');
    }
  };

  const handleScanComplete = async (scannedCode) => {
    try {
      const response = await axios.post('/api/verify-code', {
        orderId: currentOrder.orderId,
        code: scannedCode,
      });

      if (response.data.valid) {
        await handleToggle(currentOrder.orderId);
      }
    } finally {
      setScanning(false);
      setCurrentOrder(null);
    }
  };

  const groupedOrders = orders.reduce((acc, order) => {
    const slotKey = `${order.timeSlot.from}-${order.timeSlot.to}`;
    acc[slotKey] = acc[slotKey] || [];
    acc[slotKey].push(order);
    return acc;
  }, {});

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
        <Typography variant="body1" ml={2}>Loading orders...</Typography>
      </Box>
    );
  }

  return (
    <div className="time-slot-list">
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Orders by Time Slot
      </Typography>


      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Inventory Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            label="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            fullWidth
          />
          <Button variant="contained" onClick={addInventoryItem}>
            Add Item
          </Button>
        </Box>

        {/* Inventory Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Item Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventory.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Orders Summary */}
      <Accordion sx={{ mb: 4 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ bgcolor: 'primary.main', color: 'white' }}
        >
          <Typography variant="h6">Today's Orders Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {/* Orders Stats */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Orders Statistics
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Total Orders: {metrics.totalOrders}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Completed Orders: {metrics.completedOrders}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Pending Orders: {metrics.pendingOrders}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'success.main', fontWeight: 'bold' }}>
                    Total Revenue: ₹{metrics.totalAmount.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Most Sold Items */}
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                <Typography variant="h6" gutterBottom color="primary">
                  Top Selling Items
                </Typography>
                <List dense>
                  {metrics.mostSoldItems.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemText
                        primary={<Typography variant="body1">{item.name}</Typography>}
                        secondary={
                          <Typography variant="body2" color="text.secondary">
                            Quantity: {item.quantity} | Revenue: ₹{item.totalAmount.toFixed(2)}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {error && (
        <Alert severity="error" sx={{ m: 2 }}>
          {error}
        </Alert>
      )}


      {scanning && (
        <QRScanner
          onScan={handleScanComplete}
          onClose={() => setScanning(false)}
        />
      )}

      {Object.entries(groupedOrders).map(([timeslot, slotOrders]) => (
        <Paper key={timeslot} sx={{ mb: 4, p: 2, borderRadius: 2 }} elevation={3}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              p: 2,
              bgcolor: 'primary.main',
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" color="white">
              {timeslot.replace('-', ' to ')}
            </Typography>
            <Chip
              label={`${slotOrders.length} orders`}
              color="secondary"
              sx={{ color: 'white', fontWeight: 'bold' }}
            />
          </Box>

          <List>
            {slotOrders.map((order) => (
              <ListItem
                key={order.orderId}
                secondaryAction={
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setCurrentOrder(order);
                      setScanning(true);
                    }}
                    sx={{ '&:hover': { color: 'primary.main' } }}
                  >
                    <CameraAltIcon fontSize="large" />
                  </IconButton>
                }
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 2,
                  mb: 1,
                  bgcolor: 'background.paper',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                <Checkbox
                  edge="start"
                  checked={checkedOrders.includes(order.orderId)}
                  tabIndex={-1}
                  disableRipple
                  onChange={() => handleToggle(order.orderId)}
                  sx={{ mr: 2 }}
                />
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" component="div" fontWeight="medium">
                      Order #{order.orderId}
                    </Typography>
                  }
                  secondary={
                    <div>
                      <Typography variant="body2" component="div" color="text.secondary">
                        Items: {order.items.map((item) => `${item.name} (x${item.quantity})`).join(', ')}
                      </Typography>
                      <Typography
                        variant="body2"
                        component="div"
                        color="text.secondary"
                        sx={{ mt: 0.5, fontWeight: 'medium' }}
                      >
                        Total: ₹{order.totalAmount.toFixed(2)}
                      </Typography>
                    </div>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      ))}
    </div>
  );
};

export default TimeSlotList;