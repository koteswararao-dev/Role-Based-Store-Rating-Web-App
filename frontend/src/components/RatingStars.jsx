import React from 'react';

const RatingStars = ({ rating, onRate }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating-stars">
      {stars.map((star) => (
        <span
          key={star}
          className={star <= rating ? 'star filled' : 'star'}
          onClick={() => onRate && onRate(star)}
          style={{ cursor: onRate ? 'pointer' : 'default' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
