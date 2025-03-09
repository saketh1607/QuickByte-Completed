import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import axios from 'axios';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/inventory');
      setInventory(response.data);
    } catch (err) {
      setError('Failed to fetch inventory');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newItem.name || newItem.quantity <= 0 || newItem.price <= 0) {
      setError('Please fill all fields correctly');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('/api/inventory', newItem);
      setInventory([...inventory, response.data]);
      setNewItem({ name: '', quantity: 0, price: 0 });
      setSnackbarOpen(true);
    } catch (err) {
      setError('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  // Delete item from inventory
  const deleteItem = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/inventory/${id}`);
      setInventory(inventory.filter((item) => item._id !== id));
      setSnackbarOpen(true);
    } catch (err) {
      setError('Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Inventory Management
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add New Item
        </Typography>
        <TextField
          label="Item Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          type="number"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          type="number"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addItem}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Item'}
        </Button>
      </Paper>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => deleteItem(item._id)}
                    disabled={loading}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Inventory updated successfully"
      />
    </Container>
  );
};
export default InventoryManagement;



















