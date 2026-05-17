import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/CartSidebar.css';

export const CartSidebar: React.FC = () => {
  const { items, total, removeItem, updateItem } = useCart();
  const navigate = useNavigate();

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
                <div className="item-details">
                  <h4>{item.foodName}</h4>
                  <p>Rs. {item.price.toFixed(2)}</p>
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
            <p>Subtotal: Rs. {total.toFixed(2)}</p>
            <button
              className="checkout-btn"
              onClick={() => navigate('/place-order')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};