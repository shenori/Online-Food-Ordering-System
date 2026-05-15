import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import api from '../api/axios';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.email || !form.password) return 'All fields are required.';
    if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email.';
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setLoading(true); setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      // Expected: { token: string, user: User }
      login(data.token, data.user);
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '90vh' }}>
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '420px' }}>
        <h4 className="mb-4 text-center fw-bold">🍔 Sign In</h4>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control"
              value={form.email} onChange={handleChange} placeholder="you@email.com" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" name="password" className="form-control"
              value={form.password} onChange={handleChange} placeholder="••••••••" />
          </div>
          <button className="btn btn-primary w-100" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-3 small">
          No account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;