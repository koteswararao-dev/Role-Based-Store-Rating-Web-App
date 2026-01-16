import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = ({ title }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'badge-admin',
      owner: 'badge-owner',
      user: 'badge-user'
    };
    return badges[role] || 'badge-user';
  };

  return (
    <div className="dashboard-header">
      <h2>{title}</h2>
      <div className="header-actions">
        {user && (
          <div className="user-info">
            <div className="user-avatar">{getInitials(user.name)}</div>
            <div>
              <div style={{ fontWeight: 600, color: '#333' }}>{user.name}</div>
              <span className={`badge ${getRoleBadge(user.role)}`}>{user.role}</span>
            </div>
          </div>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
