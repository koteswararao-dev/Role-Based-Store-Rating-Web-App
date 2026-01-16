import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        textAlign: 'center',
        background: 'white',
        padding: '60px 40px',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          margin: '0 auto 30px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '60px',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)'
        }}>
          🏪
        </div>

        <h1 style={{
          fontSize: '48px',
          fontWeight: '700',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px'
        }}>
          Roxiler Store Rating
        </h1>

        <p style={{
          fontSize: '20px',
          color: '#666',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Rate and discover the best stores in your area. Join our community of users, store owners, and administrators.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            padding: '30px 20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '2px solid #e0e0e0'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>👤</div>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Users</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Browse stores and submit ratings
            </p>
          </div>

          <div style={{
            padding: '30px 20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '2px solid #e0e0e0'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏪</div>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Owners</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Manage stores and view ratings
            </p>
          </div>

          <div style={{
            padding: '30px 20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '2px solid #e0e0e0'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '15px' }}>👑</div>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Admins</h3>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Full platform control
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '16px 40px',
              fontSize: '18px',
              fontWeight: '600'
            }}>
              Sign In
            </button>
          </Link>

          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '16px 40px',
              fontSize: '18px',
              fontWeight: '600',
              background: 'white',
              color: '#667eea',
              border: '2px solid #667eea',
              boxShadow: 'none'
            }}>
              Create Account
            </button>
          </Link>
        </div>

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#fff3cd',
          borderRadius: '12px',
          border: '2px solid #ffc107'
        }}>
          <p style={{ fontSize: '14px', color: '#856404', fontWeight: '600', marginBottom: '10px' }}>
            🎯 Roxiler Systems Assignment
          </p>
          <p style={{ fontSize: '13px', color: '#856404' }}>
            Full-stack store rating platform with role-based access control
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
