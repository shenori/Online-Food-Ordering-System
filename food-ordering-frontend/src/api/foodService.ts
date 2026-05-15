// Food API Service
// Handles all food-related API calls

import axios from './axios';

export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

export const foodService = {
  // Get all foods
  getAllFoods: () => axios.get<Food[]>('/foods'),

  // Get foods by category
  getFoodsByCategory: (category: string) => 
    axios.get<Food[]>('/foods', { params: { category } }),

  // Get food by ID
  getFoodById: (id: number) => axios.get<Food>(`/foods/${id}`),

  // Search foods
  searchFoods: (query: string) => 
    axios.get<Food[]>('/foods/search', { params: { q: query } }),
};
