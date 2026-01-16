import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import StoreCard from '../components/StoreCard';
import RatingStars from '../components/RatingStars';
import Header from '../components/Header';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [rating, setRating] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [sort, setSort] = useState('name:asc');

  useEffect(() => {
    fetchStores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName, searchAddress, sort]);

  const fetchStores = async () => {
    try {
      const params = {};
      if (searchName) params.name = searchName;
      if (searchAddress) params.address = searchAddress;
      if (sort) params.sort = sort;
      
      const response = await userAPI.getStores(params);
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleRateStore = (store) => {
    setSelectedStore(store);
    setRating(store.userRating || 0);
  };

  const submitRating = async () => {
    try {
      if (selectedStore.userRating) {
        // Update existing rating
        await userAPI.updateRating(selectedStore.id, { rating });
        alert('Rating updated successfully!');
      } else {
        // Submit new rating
        await userAPI.rateStore({ storeId: selectedStore.id, rating });
        alert('Rating submitted successfully!');
      }
      setSelectedStore(null);
      setRating(0);
      fetchStores();
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert(error.response?.data?.message || 'Failed to submit rating');
    }
  };

  return (
    <div className="user-dashboard">
      <Header title="Browse Stores" />

      <div className="search-filters">
        <h3>🔍 Search Stores</h3>
        <div className="filter-row">
          <input
            type="text"
            placeholder="Search by store name..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by address..."
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
          />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name:asc">Name (A-Z)</option>
            <option value="name:desc">Name (Z-A)</option>
            <option value="address:asc">Address (A-Z)</option>
            <option value="address:desc">Address (Z-A)</option>
          </select>
        </div>
      </div>

      {stores.length === 0 ? (
        <div className="empty-state">
          <h3>No stores found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="stores-grid">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} onRate={handleRateStore} />
          ))}
        </div>
      )}

      {selectedStore && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedStore(null)}></div>
          <div className="rating-modal">
            <h3>Rate {selectedStore.name}</h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '10px' }}>
              {selectedStore.userRating ? 'Update your rating' : 'Submit your rating'}
            </p>
            <RatingStars rating={rating} onRate={setRating} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={submitRating} disabled={rating === 0} style={{ flex: 1 }}>
                {selectedStore.userRating ? 'Update Rating' : 'Submit Rating'}
              </button>
              <button onClick={() => setSelectedStore(null)} style={{ flex: 1, background: '#95a5a6' }}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
