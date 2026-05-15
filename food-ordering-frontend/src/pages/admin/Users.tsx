// Admin Users Page
// Manage user accounts

import React, { useState, useEffect } from 'react';
import '../../styles/Users.css';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch users from API
    setLoading(true);
  }, []);

  const handleDelete = async (userId: number) => {
    // TODO: Implement API call to delete user
    console.log('Deleting user:', userId);
  };

  const handleRoleChange = async (userId: number, newRole: string) => {
    // TODO: Implement API call to update user role
    console.log('Updating user role:', userId, newRole);
  };

  return (
    <div className="admin-users-page">
      <h1>Manage Users</h1>
      <div className="users-table">
        {/* TODO: Display users table */}
      </div>
    </div>
  );
};

export default Users;
