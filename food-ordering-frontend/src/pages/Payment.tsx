// Payment Page
// Handle payment processing

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { paymentService, type PaymentRequest } from '../api/paymentService';
import '../styles/Payment.css';

const Payment: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError(null);

    try {
      const paymentData: PaymentRequest = {
        orderId: parseInt(orderId),
        amount: 0, // Get from backend
        paymentMethod: 'CREDIT_CARD',
        cardDetails: formData,
      };

      const response = await paymentService.processPayment(paymentData);

      if (response.data.status === 'SUCCESS') {
        navigate(`/order-confirmation/${orderId}`);
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError('Payment processing failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      <div className="payment-container">
        <form onSubmit={handlePayment} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cardholderName">Cardholder Name</label>
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Processing...' : 'Complete Payment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
