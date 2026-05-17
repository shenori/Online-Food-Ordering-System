import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../api/orderService';

const PlaceOrder: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await orderService.placeOrder();
      clearCart();
      navigate(`/order/${response.data.id}`);
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <p>Your cart is empty!</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Place Order</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card p-3 mb-4">
        <h4>Order Summary</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.foodName}</td>
                <td>{item.quantity}</td>
                <td>Rs. {item.price.toFixed(2)}</td>
                <td>Rs. {(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}><strong>Total</strong></td>
              <td><strong>Rs. {total.toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back
        </button>
        <button
          className="btn btn-success"
          onClick={handlePlaceOrder}
          disabled={loading}>
          {loading ? 'Placing Order...' : 'Confirm Order'}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;