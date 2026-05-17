import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

interface Category {
  id: number;
  name: string;
}

interface Food {
  id: number;
  name: string;
  description: string;
  price: number;
  status: string;
  categoryId: number;
}

const Foods: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    status: 'AVAILABLE',
    categoryId: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchFoods();
    fetchCategories();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await api.get('/food');
      setFoods(res.data);
    } catch {
      setError('Failed to load foods');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch {
      setError('Failed to load categories');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) {
      setError('Please select a category');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await api.post('/food', formData);
      setSuccess('Food item added!');
      setFormData({
        name: '', description: '',
        price: 0, status: 'AVAILABLE', categoryId: 0,
      });
      fetchFoods();
    } catch {
      setError('Failed to add food item');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this food item?')) return;
    try {
      await api.delete(`/food/${id}`);
      setSuccess('Food deleted!');
      fetchFoods();
    } catch {
      setError('Failed to delete food');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Foods</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="card p-3 mb-4">
        <div className="row g-2">
          <div className="col-md-6">
            <input type="text" className="form-control"
              placeholder="Food Name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required />
          </div>
          <div className="col-md-6">
            <input type="number" className="form-control"
              placeholder="Price" step="0.01" value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              required />
          </div>
          <div className="col-md-12">
            <input type="text" className="form-control"
              placeholder="Description" value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>
          <div className="col-md-6">
            <select className="form-select" value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: parseInt(e.target.value) })}
              required>
              <option value={0}>Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select className="form-select" value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="AVAILABLE">Available</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
            </select>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Food Item'}
            </button>
          </div>
        </div>
      </form>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {foods.length === 0 ? (
            <tr><td colSpan={6} className="text-center">No foods found</td></tr>
          ) : (
            foods.map((food) => (
              <tr key={food.id}>
                <td>{food.id}</td>
                <td>{food.name}</td>
                <td>{food.description}</td>
                <td>Rs. {food.price.toFixed(2)}</td>
                <td>
                  <span className={`badge ${food.status === 'AVAILABLE' ? 'bg-success' : 'bg-danger'}`}>
                    {food.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(food.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Foods;