// Payment API Service
// Handles all payment-related API calls

import axios from './axios';

export interface PaymentRequest {
  orderId: number;
  amount: number;
  paymentMethod: string; // CREDIT_CARD, DEBIT_CARD, UPI, WALLET
  cardDetails?: CardDetails;
}

export interface CardDetails {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
}

export interface PaymentResponse {
  paymentId: number;
  orderId: number;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  amount: number;
  transactionId?: string;
  message: string;
}

export const paymentService = {
  // Process payment
  processPayment: (data: PaymentRequest) =>
    axios.post<PaymentResponse>('/payments', data),

  // Get payment status
  getPaymentStatus: (paymentId: number) =>
    axios.get<PaymentResponse>(`/payments/${paymentId}`),

  // Get payment history
  getPaymentHistory: () =>
    axios.get('/payments/history'),
};
