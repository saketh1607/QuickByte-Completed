import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { fetchOrders } from '../services/api';
import { Typography, Paper, Chip } from '@mui/material';

const OrderSummary = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(data => setOrders(data));
  }, []);

  const columns = [
    { field: 'orderId', headerName: 'Order ID', width: 200 },
    { field: 'timeSlot', headerName: 'Time Slot', width: 150, valueGetter: (params) => `${params.row.timeSlot.from} - ${params.row.timeSlot.to}` },
    { field: 'totalAmount', headerName: 'Amount (₹)', width: 120 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => (
      <Chip 
        label={params.value} 
        color={params.value === 'completed' ? 'success' : 'warning'} 
      />
    )},
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" gutterBottom>Order Summary</Typography>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={orders}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.orderId}
        />
      </div>
    </Paper>
  );
};

export default OrderSummary;