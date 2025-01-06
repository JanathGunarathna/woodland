import axios from 'axios';

export const ROLES = {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    LEADER: 'leader'
  };
  
  export const loginWithEmailAndPassword = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password
      });
      
      if (response.data.user) {
        // Store user data including role
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      throw error.response?.data?.message || 'Login failed';
    }
  };