// Order Details Page
// Display detailed information about a specific order

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { orderService, type Order } from '../api/orderService';
import '../styles/OrderDetails.css';

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      setLoading(true);
      setError(null);
      try {
        const response = await orderService.getOrderById(parseInt(orderId));
        setOrder(response.data);
      } catch (err) {
        setError('Failed to fetch order details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="order-details-page">
      <h1>Order Details</h1>
      <div className="order-details-container">
        <div className="order-info">
          <h2>Order #{order.id}</h2>
          <p>Status: <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></p>
          <p>Created: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p>Updated: {new Date(order.updatedAt).toLocaleDateString()}</p>
        </div>

        <div className="order-items-section">
          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>Food</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.foodName}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price.toFixed(2)}</td>
                  <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="delivery-section">
          <h3>Delivery Address</h3>
          <p>{order.deliveryAddress}</p>
        </div>

        <div className="order-total">
          <h3>Total: ₹{order.totalPrice.toFixed(2)}</h3>
        </div>

        <button onClick={() => navigate('/orders')} className="back-btn">Back to Orders</button>
      </div>
    </div>
  );
};

export default OrderDetails;
