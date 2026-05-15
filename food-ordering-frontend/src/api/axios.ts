import axios from 'axios';

// Base Axios instance — all API calls go through here
const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Change to your Spring Boot base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// ── Request Interceptor ────────────────────────────────────────
// Attach JWT token from localStorage to every outgoing request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ───────────────────────────────────────
// Handle 401 globally: clear token and redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;