import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
};

export const userAPI = {
  getStores: (params) => api.get('/user/stores', { params }),
  rateStore: (data) => api.post('/user/ratings', data),
  updateRating: (storeId, data) => api.patch(`/user/ratings/${storeId}`, data),
  updatePassword: (data) => api.patch('/user/password', data),
};

export const ownerAPI = {
  createStore: (data) => api.post('/owner/stores', data),
  getMyStores: () => api.get('/owner/stores'),
  getStoreRatings: (id) => api.get(`/owner/stores/${id}/ratings`),
  getDashboard: () => api.get('/owner/dashboard'),
  updatePassword: (data) => api.patch('/owner/password', data),
};

export const adminAPI = {
  getAllStores: (params) => api.get('/admin/stores', { params }),
  deleteStore: (id) => api.delete(`/admin/stores/${id}`),
  getAllUsers: (params) => api.get('/admin/users', { params }),
  getUserDetails: (id) => api.get(`/admin/users/${id}`),
  addUser: (data) => api.post('/admin/users', data),
  addStore: (data) => api.post('/admin/stores', data),
  getDashboardStats: () => api.get('/admin/dashboard'),
};

export default api;
