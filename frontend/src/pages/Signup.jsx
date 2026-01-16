import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authAPI.signup(formData);
      alert('✅ Account created successfully! Please login.');
      navigate('/login');
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Signup failed';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          margin: '0 auto 20px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px'
        }}>
          🏪
        </div>
        <h2>Create Account</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>Join our store rating platform</p>
      </div>

      {error && <div className="error">❌ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontSize: '14px', fontWeight: 500 }}>
            Full Name <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter full name (20-60 characters)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            disabled={loading}
          />
          <small style={{ color: '#666', fontSize: '12px' }}>Minimum 20 characters required</small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontSize: '14px', fontWeight: 500 }}>
            Email Address <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontSize: '14px', fontWeight: 500 }}>
            Password <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <input
            type="password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
          />
          <small style={{ color: '#666', fontSize: '12px' }}>
            8-16 chars, 1 uppercase, 1 special character (!@#$%^&*)
          </small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontSize: '14px', fontWeight: 500 }}>
            Address
          </label>
          <input
            type="text"
            placeholder="Enter your address (optional)"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={loading}
          />
          <small style={{ color: '#666', fontSize: '12px' }}>Maximum 400 characters</small>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontSize: '14px', fontWeight: 500 }}>
            Account Type <span style={{ color: '#e74c3c' }}>*</span>
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            disabled={loading}
          >
            <option value="user">👤 Regular User</option>
            <option value="owner">🏪 Store Owner</option>
            <option value="admin">👑 Administrator</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div style={{ marginTop: '25px', textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
          Already have an account?
        </p>
        <Link to="/login" style={{ 
          color: '#667eea', 
          textDecoration: 'none', 
          fontWeight: 600,
          fontSize: '15px'
        }}>
          Sign In →
        </Link>
      </div>
    </div>
  );
};

export default Signup;
