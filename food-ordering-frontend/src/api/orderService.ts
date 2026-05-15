// Order API Service
// Handles all order-related API calls

import axios from './axios';

export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'DELIVERED' | 'CANCELLED';
  deliveryAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  foodId: number;
  foodName: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  deliveryAddress: string;
  paymentMethod: string;
}

export const orderService = {
  // Create new order
  createOrder: (data: CreateOrderRequest) =>
    axios.post<Order>('/orders', data),

  // Get order by ID
  getOrderById: (id: number) => axios.get<Order>(`/orders/${id}`),

  // Get all orders of current user
  getUserOrders: () => axios.get<Order[]>('/orders'),

  // Cancel order
  cancelOrder: (id: number) => axios.put(`/orders/${id}/cancel`, {}),

  // Track order
  trackOrder: (id: number) => axios.get(`/orders/${id}/track`),
};
