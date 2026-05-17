import api from './axios';

export interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  status: 'AVAILABLE' | 'OUT_OF_STOCK';
  categoryId: number;
}

export const foodService = {
  getAllFoods: () => api.get<Food[]>('/food'),
  getFoodById: (id: number) => api.get<Food>(`/food/${id}`),
  createFood: (food: Omit<Food, 'id'>) => api.post<Food>('/food', food),
  updateFood: (id: number, food: Omit<Food, 'id'>) => api.put<Food>(`/food/${id}`, food),
  deleteFood: (id: number) => api.delete(`/food/${id}`),
};