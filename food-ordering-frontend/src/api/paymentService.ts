import api from './axios';

export interface Payment {
  id: number;
  orderId: number;
  amount: number;
  status: string;
  paymentDate: string;
}

export const paymentService = {
  getPayment: (orderId: number) => api.get<Payment>(`/payments/${orderId}`),
  completePayment: (orderId: number) =>
    api.put<Payment>(`/payments/${orderId}/complete`),
};