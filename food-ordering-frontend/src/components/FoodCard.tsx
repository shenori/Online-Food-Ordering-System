// Food Card Component
// Displays individual food item

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/FoodCard.css';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

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
        foodId: food.id,
        foodName: food.name,
        price: food.price,
        quantity,
        image: food.image,
      });
      setQuantity(1); // Reset quantity
    }
  };

  return (
    <div className="food-card">
      <img src={food.image} alt={food.name} className="food-image" />
      <div className="food-info">
        <h3>{food.name}</h3>
        <p className="description">{food.description}</p>
        <p className="category">{food.category}</p>
        <p className="price">₹{food.price.toFixed(2)}</p>
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
            disabled={!food.available}
            className="add-btn"
          >
            {food.available ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};
