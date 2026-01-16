import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login({ email, password });
      login(response.data.token, response.data.user);
      
      const role = response.data.user.role;
      if (role === 'admin') navigate('/admin');
      else if (role === 'owner') navigate('/owner');
      else navigate('/user');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
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
        <h2>Welcome Back!</h2>
        <p style={{ color: '#666', fontSize: '14px' }}>Sign in to your account</p>
      </div>

      {error && <div className="error">❌ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontSize: '14px', fontWeight: 500 }}>
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontSize: '14px', fontWeight: 500 }}>
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div style={{ marginTop: '25px', textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>
          Don't have an account?
        </p>
        <Link to="/signup" style={{ 
          color: '#667eea', 
          textDecoration: 'none', 
          fontWeight: 600,
          fontSize: '15px'
        }}>
          Create Account →
        </Link>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
        <p style={{ fontSize: '13px', color: '#856404', marginBottom: '8px', fontWeight: 600 }}>
          🔑 Test Credentials:
        </p>
        <p style={{ fontSize: '12px', color: '#856404', margin: '4px 0' }}>
          <strong>Admin:</strong> admin@test.com / Admin123!
        </p>
        <p style={{ fontSize: '12px', color: '#856404', margin: '4px 0' }}>
          <strong>Owner:</strong> owner@test.com / Owner123!
        </p>
        <p style={{ fontSize: '12px', color: '#856404', margin: '4px 0' }}>
          <strong>User:</strong> user@test.com / User123!
        </p>
      </div>
    </div>
  );
};

export default Login;
