// Cart Sidebar Component
// Displays cart items in a sidebar

import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/CartSidebar.css';

export const CartSidebar: React.FC = () => {
  const { items, total, removeItem, updateItem } = useCart();

  return (
    <div className="cart-sidebar">
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.foodName} />
                <div className="item-details">
                  <h4>{item.foodName}</h4>
                  <p>₹{item.price.toFixed(2)}</p>
                  <div className="item-quantity">
                    <button onClick={() => updateItem(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateItem(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <p>Subtotal: ₹{total.toFixed(2)}</p>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};
