import React, { useEffect, useState } from 'react';
import { foodService, type Food } from '../api/foodService';
import { FoodCard } from './FoodCard';
import '../styles/FoodList.css';

interface FoodListProps {
  selectedCategory?: string;
}

export const FoodList: React.FC<FoodListProps> = ({ selectedCategory }) => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await foodService.getAllFoods();
        setFoods(response.data);
      } catch (err) {
        setError('Failed to fetch foods');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [selectedCategory]);

  if (loading) return <div className="loading">Loading foods...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="food-list">
      {foods.length === 0 ? (
        <p>No foods available</p>
      ) : (
        foods.map((food) => <FoodCard key={food.id} food={food} />)
      )}
    </div>
  );
};