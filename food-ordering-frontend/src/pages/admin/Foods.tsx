// Admin Foods Page
// Manage food items

import React, { useState, useEffect } from 'react';
import '../../styles/Foods.css';

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

const Foods: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    available: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create food
    console.log('Creating food:', formData);
  };

  const handleDelete = async (id: number) => {
    // TODO: Implement API call to delete food
    console.log('Deleting food:', id);
  };

  return (
    <div className="foods-page">
      <h1>Manage Foods</h1>
      <form onSubmit={handleSubmit} className="food-form">
        <input
          type="text"
          placeholder="Food Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          {/* TODO: Fetch categories from API */}
        </select>
        <input
          type="url"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
        <button type="submit">Add Food</button>
      </form>
      <div className="foods-list">
        {/* TODO: Display foods */}
      </div>
    </div>
  );
};

export default Foods;
