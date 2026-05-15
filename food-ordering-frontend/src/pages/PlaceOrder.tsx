// Place Order Page
// Form to enter delivery details and place order

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../api/orderService';
import '../styles/PlaceOrder.css';

const PlaceOrder: React.FC = () => {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim()) {
      setError('Please enter delivery address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await orderService.createOrder({
        deliveryAddress,
        paymentMethod,
      });
      clearCart();
      navigate(`/payment/${response.data.id}`);
    } catch (err) {
      setError('Failed to place order');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="place-order-page">
        <p>Your cart is empty. Please add items before placing an order.</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="place-order-page">
      <h1>Place Order</h1>
      <div className="order-container">
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Enter your delivery address"
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="payment">Payment Method</label>
            <select
              id="payment"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="WALLET">Wallet</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="order-summary">
            <h3>Order Summary</h3>
            {items.map((item) => (
              <p key={item.id}>
                {item.foodName} x {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
              </p>
            ))}
            <p className="total">Total: ₹{total.toFixed(2)}</p>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate('/cart')}>Back to Cart</button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Placing Order...' : 'Place Order & Pay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
