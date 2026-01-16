import React from 'react';
import RatingStars from './RatingStars';

const StoreCard = ({ store, onRate }) => {
  const avgRating = parseFloat(store.avgRating) || 0;
  const totalRatings = parseInt(store.totalRatings) || 0;
  const userRating = parseInt(store.userRating) || 0;

  return (
    <div className="store-card">
      <h3>{store.name}</h3>
      <p><strong>📧 Email:</strong> {store.email}</p>
      <p><strong>📍 Address:</strong> {store.address}</p>
      
      <div style={{ margin: '15px 0', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>Overall Rating</p>
        <RatingStars rating={Math.round(avgRating)} />
        <p style={{ fontSize: '14px', color: '#333', marginTop: '5px' }}>
          <strong>{avgRating.toFixed(1)}</strong> ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})
        </p>
      </div>

      {userRating > 0 && (
        <div style={{ margin: '15px 0', padding: '15px', background: '#e8f5e9', borderRadius: '8px' }}>
          <p style={{ fontSize: '13px', color: '#27ae60', marginBottom: '8px' }}>Your Rating</p>
          <RatingStars rating={userRating} />
        </div>
      )}

      {onRate && (
        <button onClick={() => onRate(store)} className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
          {userRating > 0 ? '✏️ Update Rating' : '⭐ Rate Store'}
        </button>
      )}
    </div>
  );
};

export default StoreCard;
