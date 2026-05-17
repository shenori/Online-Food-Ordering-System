import api from './axios';

export interface OrderItem {
  foodItemId: number;
  foodItemName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  status: string;
  orderDate: string;
  totalAmount: number;
  orderItems: OrderItem[];
}

export const orderService = {
  placeOrder: () => api.post<Order>('/orders/place'),
  getMyOrders: () => api.get<Order[]>('/orders/my-orders'),
  getOrderById: (id: number) => api.get<Order>(`/orders/${id}`),
  getAllOrders: () => api.get<Order[]>('/orders/all'),
  updateOrderStatus: (id: number, status: string) =>
    api.put<Order>(`/orders/${id}/status`, null, { params: { status } }),
};