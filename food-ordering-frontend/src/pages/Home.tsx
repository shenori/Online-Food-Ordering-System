// Home Page
// Main food browsing page with category filter

import React, { useState } from 'react';
import { FoodList } from '../components/FoodList';
import { CartSidebar } from '../components/CartSidebar';
import '../styles/Home.css';

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();

  const categories = ['Pizza', 'Burgers', 'Salads', 'Desserts', 'Beverages'];

  return (
    <div className="home-page">
      <div className="food-section">
        <div className="category-filter">
          <h3>Categories</h3>
          <button
            className={selectedCategory === undefined ? 'active' : ''}
            onClick={() => setSelectedCategory(undefined)}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <FoodList selectedCategory={selectedCategory} />
      </div>
      <CartSidebar />
    </div>
  );
};

export default Home;
