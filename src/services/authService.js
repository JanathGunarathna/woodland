import api from '../utils/api';

export const authService = {
  async createAccount(accountData) {
    const formData = new FormData();
    
    // Append all account data to FormData
    Object.keys(accountData).forEach(key => {
      if (accountData[key] !== null && accountData[key] !== undefined) {
        formData.append(key, accountData[key]);
      }
    });

    // Append profile picture if exists
    if (accountData.profilePicture) {
      formData.append('profilePicture', accountData.profilePicture);
    }

    try {
      const response = await api.post('/accounts', formData);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Account creation failed');
    }
  },

  async login(email, password) {
    try {
      const response = await api.post('/login', { email, password });
      
      // Store token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : new Error('Login failed');
    }
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
};