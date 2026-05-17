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
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/login', form);
      // backend returns { token, email, role }
      login(data.token, {
        id: 0,
        name: data.email,
        email: data.email,
        role: data.role,
      });
      navigate('/');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '90vh', display: 'flex',
      justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '420px',
        padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h4 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          🔐 Sign In
        </h4>
        {error && (
          <div style={{ background: '#fee', color: '#c00',
            padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem' }}>
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" name="email"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              value={form.email} onChange={handleChange}
              placeholder="you@email.com" />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input type="password" name="password"
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              value={form.password} onChange={handleChange}
              placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '0.75rem',
              background: '#007bff', color: 'white',
              border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          No account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;