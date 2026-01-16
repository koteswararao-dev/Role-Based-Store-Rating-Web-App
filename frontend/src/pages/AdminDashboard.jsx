import React, { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Header from '../components/Header';

const AdminDashboard = () => {
  const [stores, setStores] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [sort, setSort] = useState('name:asc');
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddStore, setShowAddStore] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', owner_id: '' });

  useEffect(() => {
    fetchStats();
    fetchStores();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminAPI.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchStores = async () => {
    try {
      const params = { ...filters, sort };
      const response = await adminAPI.getAllStores(params);
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const params = { ...filters, sort };
      const response = await adminAPI.getAllUsers(params);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteStore = async (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await adminAPI.deleteStore(id);
        fetchStores();
        fetchStats();
        alert('Store deleted successfully!');
      } catch (error) {
        alert(error.response?.data?.message || 'Failed to delete store');
      }
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.addUser(newUser);
      setShowAddUser(false);
      setNewUser({ name: '', email: '', password: '', address: '', role: 'user' });
      fetchUsers();
      fetchStats();
      alert('User added successfully!');
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Failed to add user');
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.addStore(newStore);
      setShowAddStore(false);
      setNewStore({ name: '', email: '', address: '', owner_id: '' });
      fetchStores();
      fetchStats();
      alert('Store added successfully!');
    } catch (error) {
      alert(error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Failed to add store');
    }
  };

  const handleSort = (field) => {
    const direction = sort === `${field}:asc` ? 'desc' : 'asc';
    setSort(`${field}:${direction}`);
  };

  useEffect(() => {
    if (activeTab === 'stores') fetchStores();
    if (activeTab === 'users') fetchUsers();
  }, [filters, sort, activeTab]);

  const owners = users.filter(u => u.role === 'owner');

  return (
    <div className="admin-dashboard">
      <Header title="Admin Dashboard" />

      {activeTab === 'dashboard' && (
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Users</h3>
            <div className="stat-value">{stats.totalUsers}</div>
          </div>
          <div className="stat-card">
            <h3>Total Stores</h3>
            <div className="stat-value">{stats.totalStores}</div>
          </div>
          <div className="stat-card">
            <h3>Total Ratings</h3>
            <div className="stat-value">{stats.totalRatings}</div>
          </div>
        </div>
      )}

      <div className="tabs">
        <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
          📊 Dashboard
        </button>
        <button className={activeTab === 'stores' ? 'active' : ''} onClick={() => setActiveTab('stores')}>
          🏪 Stores
        </button>
        <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
          👥 Users
        </button>
      </div>

      {activeTab === 'stores' && (
        <>
          <div className="search-filters">
            <div className="flex-between mb-20">
              <h3>🔍 Search & Filter Stores</h3>
              <button onClick={() => setShowAddStore(!showAddStore)}>
                {showAddStore ? '✖ Cancel' : '➕ Add Store'}
              </button>
            </div>

            {showAddStore && (
              <form onSubmit={handleAddStore} className="form-modal">
                <input
                  type="text"
                  placeholder="Store Name (20-60 characters)"
                  value={newStore.name}
                  onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Store Email"
                  value={newStore.email}
                  onChange={(e) => setNewStore({ ...newStore, email: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={newStore.address}
                  onChange={(e) => setNewStore({ ...newStore, address: e.target.value })}
                  required
                />
                <select
                  value={newStore.owner_id}
                  onChange={(e) => setNewStore({ ...newStore, owner_id: e.target.value })}
                  required
                >
                  <option value="">Select Owner</option>
                  {owners.map(owner => (
                    <option key={owner.id} value={owner.id}>{owner.name} ({owner.email})</option>
                  ))}
                </select>
                <button type="submit">Create Store</button>
              </form>
            )}

            <div className="filter-row">
              <input
                type="text"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Search by email..."
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
              />
              <input
                type="text"
                placeholder="Search by address..."
                value={filters.address}
                onChange={(e) => setFilters({ ...filters, address: e.target.value })}
              />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Name {sort.includes('name') && (sort.includes('asc') ? '↑' : '↓')}</th>
                <th onClick={() => handleSort('email')}>Email {sort.includes('email') && (sort.includes('asc') ? '↑' : '↓')}</th>
                <th onClick={() => handleSort('address')}>Address {sort.includes('address') && (sort.includes('asc') ? '↑' : '↓')}</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((store) => (
                <tr key={store.id}>
                  <td>{store.name}</td>
                  <td>{store.email}</td>
                  <td>{store.address}</td>
                  <td>⭐ {parseFloat(store.avgRating || 0).toFixed(1)} ({store.totalRatings || 0})</td>
                  <td>
                    <button className="btn-danger" onClick={() => handleDeleteStore(store.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === 'users' && (
        <>
          <div className="search-filters">
            <div className="flex-between mb-20">
              <h3>🔍 Search & Filter Users</h3>
              <button onClick={() => setShowAddUser(!showAddUser)}>
                {showAddUser ? '✖ Cancel' : '➕ Add User'}
              </button>
            </div>

            {showAddUser && (
              <form onSubmit={handleAddUser} className="form-modal">
                <input
                  type="text"
                  placeholder="Name (20-60 characters)"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password (8-16 chars, 1 uppercase, 1 special)"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Address (optional)"
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="user">User</option>
                  <option value="owner">Owner</option>
                  <option value="admin">Admin</option>
                </select>
                <button type="submit">Create User</button>
              </form>
            )}

            <div className="filter-row">
              <input
                type="text"
                placeholder="Search by name..."
                value={filters.name}
                onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Search by email..."
                value={filters.email}
                onChange={(e) => setFilters({ ...filters, email: e.target.value })}
              />
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
              >
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="owner">Owner</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Name {sort.includes('name') && (sort.includes('asc') ? '↑' : '↓')}</th>
                <th onClick={() => handleSort('email')}>Email {sort.includes('email') && (sort.includes('asc') ? '↑' : '↓')}</th>
                <th>Address</th>
                <th onClick={() => handleSort('role')}>Role {sort.includes('role') && (sort.includes('asc') ? '↑' : '↓')}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address || 'N/A'}</td>
                  <td><span className={`badge badge-${user.role}`}>{user.role}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
