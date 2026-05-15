// Admin Categories Page
// Manage food categories (already exists - placeholder)

import React, { useState, useEffect } from 'react';
import '../../styles/Categories.css';

interface Category {
  id: number;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement API call to create category
    console.log('Creating category:', formData);
  };

  return (
    <div className="categories-page">
      <h1>Manage Categories</h1>
      <form onSubmit={handleSubmit} className="category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit">Add Category</button>
      </form>
      <div className="categories-list">
        {/* TODO: Display categories */}
      </div>
    </div>
  );
};

export default Categories;
