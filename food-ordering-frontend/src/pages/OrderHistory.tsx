// Order History Page
// Display user's previous orders

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService, type Order } from '../api/orderService';
import '../styles/OrderHistory.css';

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await orderService.getUserOrders();
        setOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="order-history-page">
      <h1>Order History</h1>
      {error && <div className="error">{error}</div>}
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet</p>
          <button onClick={() => navigate('/')}>Start Shopping</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <p className="order-date">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.foodName} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                ))}
              </div>
              <p className="order-total">Total: ₹{order.totalPrice.toFixed(2)}</p>
              <p className="order-address">Delivery: {order.deliveryAddress}</p>
              <button onClick={() => navigate(`/order-details/${order.id}`)} className="details-btn">
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
