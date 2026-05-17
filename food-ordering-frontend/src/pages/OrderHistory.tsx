import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService, type Order } from '../api/orderService';

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await orderService.getMyOrders();
        setOrders(response.data);
      } catch {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="container mt-5">Loading orders...</div>;

  return (
    <div className="container mt-4">
      <h2>My Orders</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {orders.length === 0 ? (
        <div className="text-center mt-5">
          <p>You haven't placed any orders yet.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id} className="card mb-3 p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5>Order #{order.id}</h5>
                <span className={`badge ${
                  order.status === 'DELIVERED' ? 'bg-success' :
                  order.status === 'CANCELLED' ? 'bg-danger' :
                  order.status === 'PREPARING' ? 'bg-warning' : 'bg-primary'
                }`}>
                  {order.status}
                </span>
              </div>
              <p className="text-muted mb-1">
                Date: {new Date(order.orderDate).toLocaleDateString()}
              </p>
              <div>
                {order.orderItems.map((item, idx) => (
                  <p key={idx} className="mb-0">
                    {item.foodItemName} x {item.quantity} =
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </p>
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <strong>Total: Rs. {order.totalAmount.toFixed(2)}</strong>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate(`/order/${order.id}`)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;