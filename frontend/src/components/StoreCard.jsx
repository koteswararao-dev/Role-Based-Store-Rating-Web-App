import React from 'react';
import RatingStars from './RatingStars';

const StoreCard = ({ store, onRate }) => {
  const avgRating = parseFloat(store.avgRating) || 0;
  const totalRatings = parseInt(store.totalRatings) || 0;
  const userRating = parseInt(store.userRating) || 0;

  // Generate a unique store image based on store name
  const getStoreImage = (name) => {
    const images = [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=400&h=200&fit=crop'
    ];
    const index = name.length % images.length;
    return images[index];
  };

  const getStoreCategory = (name) => {
    const categories = ['Retail', 'Restaurant', 'Cafe', 'Electronics', 'Fashion', 'Grocery', 'Services', 'Entertainment'];
    const index = name.charCodeAt(0) % categories.length;
    return categories[index];
  };

  return (
    <div className="store-card">
      <img 
        src={getStoreImage(store.name)} 
        alt={store.name}
        className="store-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x200/FF6B6B/FFFFFF?text=Store+Image';
        }}
      />
      <div className="store-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
          <h3>{store.name}</h3>
          <span className="store-badge">{getStoreCategory(store.name)}</span>
        </div>
        
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>📧</span>
          <strong>Email:</strong> {store.email}
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>📍</span>
          <strong>Location:</strong> {store.address}
        </p>
        
        <div style={{ 
          margin: '20px 0', 
          padding: '20px', 
          background: 'linear-gradient(135deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))',
          borderRadius: '12px',
          border: '2px solid rgba(255,107,107,0.2)'
        }}>
          <p style={{ fontSize: '13px', color: '#666', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
            ⭐ Overall Rating
          </p>
          <RatingStars rating={Math.round(avgRating)} />
          <p style={{ fontSize: '16px', color: '#333', marginTop: '10px', fontWeight: 700 }}>
            {avgRating.toFixed(1)} / 5.0
            <span style={{ fontSize: '14px', color: '#666', fontWeight: 400, marginLeft: '10px' }}>
              ({totalRatings} {totalRatings === 1 ? 'review' : 'reviews'})
            </span>
          </p>
        </div>

        {userRating > 0 && (
          <div style={{ 
            margin: '20px 0', 
            padding: '18px', 
            background: 'linear-gradient(135deg, rgba(81,207,102,0.15), rgba(46,204,113,0.15))',
            borderRadius: '12px',
            border: '2px solid rgba(81,207,102,0.3)'
          }}>
            <p style={{ fontSize: '13px', color: '#27ae60', marginBottom: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
              ✅ Your Rating
            </p>
            <RatingStars rating={userRating} />
            <p style={{ fontSize: '14px', color: '#27ae60', marginTop: '8px', fontWeight: 600 }}>
              You rated this {userRating} star{userRating > 1 ? 's' : ''}
            </p>
          </div>
        )}

        {onRate && (
          <button 
            onClick={() => onRate(store)} 
            className="btn-primary" 
            style={{ 
              width: '100%', 
              marginTop: '15px',
              fontSize: '15px',
              fontWeight: 700,
              padding: '14px'
            }}
          >
            {userRating > 0 ? '✏️ Update Your Rating' : '⭐ Rate This Store'}
          </button>
        )}
      </div>
    </div>
  );
};

export default StoreCard;
