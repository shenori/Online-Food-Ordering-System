import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { Food } from '../api/foodService';
import '../styles/FoodCard.css';

interface FoodCardProps {
  food: Food;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (quantity > 0) {
      addItem({
        id: food.id,
        foodItemId: food.id,
        foodName: food.name,
        price: food.price,
        quantity,
      });
      setQuantity(1);
    }
  };

  const isAvailable = food.status === 'AVAILABLE';

  return (
    <div className="food-card">
      <div className="food-info">
        <h3>{food.name}</h3>
        <p className="description">{food.description}</p>
        <p className="price">Rs. {food.price.toFixed(2)}</p>
        <span className={`status ${isAvailable ? 'available' : 'out-of-stock'}`}>
          {isAvailable ? 'Available' : 'Out of Stock'}
        </span>
        <div className="food-actions">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="quantity-input"
          />
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable}
            className="add-btn"
          >
            {isAvailable ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};