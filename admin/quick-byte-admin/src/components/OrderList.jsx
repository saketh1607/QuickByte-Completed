import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import QRScanner from './QRScanner';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders');
      setOrders(response.data.filter(order => order.status === 'pending'));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleScanComplete = async (scannedCode) => {
    try {
      const response = await axios.post('/api/verify-code', {
        orderId: currentOrder._id,
        code: scannedCode
      });
      
      if (response.data.valid) {
        await axios.patch(`/api/orders/${currentOrder._id}`, { status: 'completed' });
        setOrders(orders.filter(order => order._id !== currentOrder._id));
      }
    } finally {
      setScanning(false);
      setCurrentOrder(null);
    }
  };

  return (
    <div className="order-list">
      <Typography variant="h4" gutterBottom>
        Pending Orders
      </Typography>
      
      {scanning && (
        <QRScanner 
          onScan={handleScanComplete}
          onClose={() => setScanning(false)}
        />
      )}

      <List>
        {orders.map(order => (
          <ListItem key={order._id} secondaryAction={
            <IconButton 
              edge="end"
              onClick={() => {
                setCurrentOrder(order);
                setScanning(true);
              }}
            >
              <CameraAltIcon />
            </IconButton>
          }>
            <Checkbox
              edge="start"
              checked={false}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={`Order #${order.orderId}`}
              secondary={
                <>
                  <div>Time Slot: {order.timeSlot.from} - {order.timeSlot.to}</div>
                  <div>Items: {order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</div>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OrderList;