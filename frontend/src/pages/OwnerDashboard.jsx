import React, { useState, useEffect } from 'react';
import { ownerAPI } from '../services/api';
import Header from '../components/Header';

const OwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    fetchMyStores();
  }, []);

  const fetchMyStores = async () => {
    try {
      const response = await ownerAPI.getMyStores();
      setStores(response.data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ownerAPI.createStore(formData);
      setShowForm(false);
      setFormData({ name: '', email: '', address: '' });
      fetchMyStores();
      alert('Store created successfully!');
    } catch (error) {
      console.error('Error creating store:', error);
      alert(error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Failed to create store');
    }
  };

  const viewRatings = async (store) => {
    try {
      const response = await ownerAPI.getStoreRatings(store.id);
      setSelectedStore(store);
      setRatings(response.data.ratings || []);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      alert('Failed to fetch ratings');
    }
  };

  return (
    <div className="owner-dashboard">
      <Header title="My Stores" />

      <div className="flex-between mb-20">
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? '✖ Cancel' : '➕ Add New Store'}
        </button>
      </div>

      {showForm && (
        <div className="form-modal">
          <h3>Create New Store</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Store Name (20-60 characters)"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Store Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Address (max 400 characters)"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
            <button type="submit">Create Store</button>
          </form>
        </div>
      )}

      {stores.length === 0 ? (
        <div className="empty-state">
          <h3>No stores yet</h3>
          <p>Create your first store to get started</p>
        </div>
      ) : (
        <div className="stores-grid">
          {stores.map((store) => (
            <div key={store.id} className="store-card">
              <h3>{store.name}</h3>
              <p><strong>Email:</strong> {store.email}</p>
              <p><strong>Address:</strong> {store.address}</p>
              <div className="rating-stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={star <= Math.round(parseFloat(store.avgRating || 0)) ? 'star filled' : 'star'}>
                    ★
                  </span>
                ))}
              </div>
              <p>Average: <strong>{parseFloat(store.avgRating || 0).toFixed(1)}</strong> ({store.totalRatings || 0} ratings)</p>
              <button onClick={() => viewRatings(store)} className="btn-primary" style={{ width: '100%', marginTop: '15px' }}>
                View Ratings
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedStore && (
        <>
          <div className="modal-overlay" onClick={() => setSelectedStore(null)}></div>
          <div className="rating-modal" style={{ minWidth: '600px', maxHeight: '80vh', overflow: 'auto' }}>
            <h3>Ratings for {selectedStore.name}</h3>
            <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
              Average Rating: <strong style={{ fontSize: '24px', color: '#667eea' }}>
                {parseFloat(selectedStore.avgRating || 0).toFixed(1)} ⭐
              </strong>
            </p>

            {ratings.length === 0 ? (
              <div className="empty-state">
                <p>No ratings yet</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Rating</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((rating) => (
                    <tr key={rating.id}>
                      <td>{rating.user?.name}</td>
                      <td>{rating.user?.email}</td>
                      <td>
                        <div className="rating-stars" style={{ fontSize: '18px' }}>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={star <= rating.rating ? 'star filled' : 'star'}>★</span>
                          ))}
                        </div>
                      </td>
                      <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <button onClick={() => setSelectedStore(null)} style={{ width: '100%', marginTop: '20px', background: '#95a5a6' }}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OwnerDashboard;
