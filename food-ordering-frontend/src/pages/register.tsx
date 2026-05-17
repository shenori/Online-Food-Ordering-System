import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    name: '', email: '', password: '', confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validate = (): boolean => {
    if (!form.name.trim()) { setError('Name is required.'); return false; }
    if (!form.email.trim()) { setError('Email is required.'); return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email.'); return false;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.'); return false;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.'); return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/register', {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration failed.');
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
          📝 Create Account
        </h4>
        {success ? (
          <div style={{ textAlign: 'center', color: 'green' }}>
            <p>✅ Account created successfully!</p>
            <p>Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: '#fee', color: '#c00',
                padding: '0.5rem', borderRadius: '4px', marginBottom: '1rem' }}>
                {error}
              </div>
            )}
            <div style={{ marginBottom: '1rem' }}>
              <label>Full Name</label>
              <input type="text" name="name"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                value={form.name} onChange={handleChange}
                placeholder="John Doe" disabled={loading} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Email</label>
              <input type="email" name="email"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                value={form.email} onChange={handleChange}
                placeholder="john@example.com" disabled={loading} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Password</label>
              <input type="password" name="password"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                value={form.password} onChange={handleChange}
                placeholder="Minimum 6 characters" disabled={loading} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword"
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                value={form.confirmPassword} onChange={handleChange}
                placeholder="Re-enter password" disabled={loading} />
            </div>
            <button type="submit" disabled={loading}
              style={{ width: '100%', padding: '0.75rem',
                background: '#28a745', color: 'white',
                border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Already have an account? <Link to="/login">Sign in here</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;