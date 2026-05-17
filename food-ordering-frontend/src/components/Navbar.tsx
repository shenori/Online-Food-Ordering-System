import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">🍔 FoodOrder</Link>

      <button className="navbar-toggler" type="button"
        data-bs-toggle="collapse" data-bs-target="#navMenu">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          {isAuthenticated && !isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">🛒 Cart</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order-history">My Orders</Link>
              </li>
            </>
          )}
          {isAdmin && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/categories">Categories</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/foods">Foods</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/orders">Orders</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/users">Users</Link>
              </li>
            </>
          )}
        </ul>

        <ul className="navbar-nav">
          {isAuthenticated ? (
            <>
              <li className="nav-item d-flex align-items-center me-3">
                <span className="text-light small">
                  👤 {user?.name}
                  {isAdmin && (
                    <span className="badge bg-warning ms-2">Admin</span>
                  )}
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;