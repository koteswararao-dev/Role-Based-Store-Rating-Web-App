import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Circles */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '-5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255,107,107,0.3), transparent)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(78,205,196,0.3), transparent)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }}></div>

      <div style={{
        maxWidth: '900px',
        textAlign: 'center',
        background: 'white',
        padding: '70px 50px',
        borderRadius: '30px',
        boxShadow: '0 30px 90px rgba(0,0,0,0.3)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Store Icon with Gradient */}
        <div style={{
          width: '140px',
          height: '140px',
          margin: '0 auto 35px',
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8C42 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '70px',
          boxShadow: '0 15px 40px rgba(255, 107, 107, 0.5)',
          animation: 'float 3s ease-in-out infinite'
        }}>
          🏪
        </div>

        <h1 style={{
          fontSize: '56px',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8C42 50%, #4ECDC4 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '20px',
          letterSpacing: '-1px'
        }}>
          Roxiler Store Rating
        </h1>

        <p style={{
          fontSize: '22px',
          color: '#666',
          marginBottom: '50px',
          lineHeight: '1.8',
          maxWidth: '700px',
          margin: '0 auto 50px'
        }}>
          Discover, rate, and review the best stores in your area. Join thousands of users sharing their experiences!
        </p>

        {/* Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '25px',
          marginBottom: '50px'
        }}>
          <div style={{
            padding: '35px 25px',
            background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(255,107,107,0.05))',
            borderRadius: '20px',
            border: '3px solid rgba(255,107,107,0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,107,107,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>👤</div>
            <h3 style={{ color: '#FF6B6B', marginBottom: '12px', fontSize: '20px', fontWeight: '700' }}>Users</h3>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
              Browse stores, submit ratings, and share your experiences
            </p>
          </div>

          <div style={{
            padding: '35px 25px',
            background: 'linear-gradient(135deg, rgba(78,205,196,0.1), rgba(78,205,196,0.05))',
            borderRadius: '20px',
            border: '3px solid rgba(78,205,196,0.2)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(78,205,196,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>🏪</div>
            <h3 style={{ color: '#4ECDC4', marginBottom: '12px', fontSize: '20px', fontWeight: '700' }}>Owners</h3>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
              Manage your stores and view customer ratings
            </p>
          </div>

          <div style={{
            padding: '35px 25px',
            background: 'linear-gradient(135deg, rgba(255,230,109,0.1), rgba(255,230,109,0.05))',
            borderRadius: '20px',
            border: '3px solid rgba(255,230,109,0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-10px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(255,230,109,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>👑</div>
            <h3 style={{ color: '#FFD93D', marginBottom: '12px', fontSize: '20px', fontWeight: '700' }}>Admins</h3>
            <p style={{ fontSize: '15px', color: '#666', lineHeight: '1.6' }}>
              Full platform control and analytics dashboard
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '18px 45px',
              fontSize: '18px',
              fontWeight: '700',
              background: 'linear-gradient(135deg, #FF6B6B, #FF8C42)',
              boxShadow: '0 10px 30px rgba(255,107,107,0.4)'
            }}>
              🚀 Sign In Now
            </button>
          </Link>

          <Link to="/signup" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '18px 45px',
              fontSize: '18px',
              fontWeight: '700',
              background: 'white',
              color: '#FF6B6B',
              border: '3px solid #FF6B6B',
              boxShadow: '0 10px 30px rgba(255,107,107,0.2)'
            }}>
              ✨ Create Account
            </button>
          </Link>
        </div>

        {/* Stats Section */}
        <div style={{
          marginTop: '60px',
          padding: '30px',
          background: 'linear-gradient(135deg, rgba(255,107,107,0.05), rgba(78,205,196,0.05))',
          borderRadius: '20px',
          border: '2px solid rgba(255,107,107,0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '30px' }}>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#FF6B6B', marginBottom: '8px' }}>1000+</div>
              <div style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Active Users</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#4ECDC4', marginBottom: '8px' }}>500+</div>
              <div style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Stores Listed</div>
            </div>
            <div>
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#FFD93D', marginBottom: '8px' }}>5000+</div>
              <div style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Reviews Posted</div>
            </div>
          </div>
        </div>

        {/* Assignment Badge */}
        <div style={{
          marginTop: '40px',
          padding: '25px',
          background: 'linear-gradient(135deg, #FFE66D, #FFD93D)',
          borderRadius: '16px',
          border: '3px solid #FFC107',
          boxShadow: '0 8px 25px rgba(255,215,0,0.3)'
        }}>
          <p style={{ fontSize: '16px', color: '#856404', fontWeight: '700', marginBottom: '10px' }}>
            🎯 Roxiler Systems Full-Stack Assignment
          </p>
          <p style={{ fontSize: '14px', color: '#856404', fontWeight: '500' }}>
            Complete store rating platform with role-based access control, built with React, Node.js, Express & SQLite
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
