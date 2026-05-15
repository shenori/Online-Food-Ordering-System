import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/Authcontext';
import { CartProvider } from './context/CartContext';
import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/Navbar';

// Public Pages
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';

// Customer Pages
import Cart from './pages/cart';
import PlaceOrder from './pages/PlaceOrder';
import Payment from './pages/Payment';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';

// Admin Pages
import Categories from './pages/admin/Categories';
import Foods from './pages/admin/Foods';
import Orders from './pages/admin/Orders';
import Users from './pages/admin/Users';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Customer Routes (Protected) */}
            <Route
              path="/cart"
              element={
                <PrivateRoute requiredRole="CUSTOMER">
                  <Cart />
                </PrivateRoute>
              }
            />
            <Route
              path="/place-order"
              element={
                <PrivateRoute requiredRole="CUSTOMER">
                  <PlaceOrder />
                </PrivateRoute>
              }
            />
            <Route
              path="/payment"
              element={
                <PrivateRoute requiredRole="CUSTOMER">
                  <Payment />
                </PrivateRoute>
              }
            />
            <Route
              path="/order-history"
              element={
                <PrivateRoute requiredRole="CUSTOMER">
                  <OrderHistory />
                </PrivateRoute>
              }
            />
            <Route
              path="/order/:id"
              element={
                <PrivateRoute requiredRole="CUSTOMER">
                  <OrderDetails />
                </PrivateRoute>
              }
            />

            {/* Admin Routes (Protected) */}
            <Route
              path="/admin/categories"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <Categories />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/foods"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <Foods />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <Orders />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <PrivateRoute requiredRole="ADMIN">
                  <Users />
                </PrivateRoute>
              }
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
