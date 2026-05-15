// Cart API Service
// Handles all cart-related API calls

import axios from './axios';

export interface CartItem {
  id: number;
  foodId: number;
  foodName: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalPrice: number;
}

export const cartService = {
  // Get user's cart
  getCart: () => axios.get<Cart>('/cart'),

  // Add item to cart
  addItemToCart: (foodId: number, quantity: number) =>
    axios.post('/cart/items', { foodId, quantity }),

  // Update cart item
  updateCartItem: (cartItemId: number, quantity: number) =>
    axios.put(`/cart/items/${cartItemId}`, { quantity }),

  // Remove item from cart
  removeFromCart: (cartItemId: number) =>
    axios.delete(`/cart/items/${cartItemId}`),

  // Clear entire cart
  clearCart: () => axios.delete('/cart'),
};
