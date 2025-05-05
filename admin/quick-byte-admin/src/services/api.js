// src/services/api.js
const API_BASE_URL = 'http://localhost:5000/api'; // Update if your backend runs on a different port

// Fetch all orders
export const fetchOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    if (!response.ok) throw new Error('Failed to fetch orders');
    return await response.json();
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

// Fetch analytics data
export const fetchMetrics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`);
    if (!response.ok) throw new Error('Failed to fetch metrics');
    return await response.json();
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return null;
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return response.ok;
  } catch (error) {
    console.error('Error updating order:', error);
    return false;
  }
};