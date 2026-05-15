// Admin Orders Page
// Manage all orders

import React, { useState, useEffect } from 'react';
import '../../styles/Orders.css';

interface AdminOrder {
  id: number;
  userId: number;
  totalPrice: number;
  status: string;
  createdAt: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    // TODO: Fetch orders from API
    setLoading(true);
  }, [filter]);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    // TODO: Implement API call to update order status
    console.log('Updating order status:', orderId, newStatus);
  };

  return (
    <div className="admin-orders-page">
      <h1>Manage Orders</h1>
      <div className="filters">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="ALL">All Orders</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PREPARING">Preparing</option>
          <option value="READY">Ready</option>
          <option value="DELIVERED">Delivered</option>
        </select>
      </div>
      <div className="orders-table">
        {/* TODO: Display orders table */}
      </div>
    </div>
  );
};

export default Orders;
