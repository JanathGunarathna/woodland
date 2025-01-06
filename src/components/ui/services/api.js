// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const accountService = {
  // Create account in backend database
  createAccount: async (userData) => {
    try {
      const response = await api.post('/accounts', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get account details
  getAccount: async (userId) => {
    try {
      const response = await api.get(`/accounts/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update account details
  updateAccount: async (userId, userData) => {
    try {
      const response = await api.put(`/accounts/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;