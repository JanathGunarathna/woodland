import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginNavbar from './loginNavbar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
  
    try {
      // Special case for admin
      if (email === 'admin@gmail.com' && password === 'admin123') {
        setIsLoading(false);
        navigate('/admin');
        return;
      }
  
      // User authentication
      const response = await fetch('http://localhost:8000/api/account/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.status) {
        localStorage.setItem('user', JSON.stringify(data.data));
        setIsLoading(false);
        navigate('/user');
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
};
  
  // Rest of the component remains the same
  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-red-50 to-white">
      <LoginNavbar />
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          {/* Logo Section */}
          <div className="flex justify-center mb-5">
            <img
              src="/images/woodland.jpg"
              alt="Woodland Rovers Logo"
              className="w-32 h-32 mb-2 border-4 rounded-xl shadow-xl object-cover"
            />
          </div>

          {/* Title Section */}
          <div className="text-center mb-6">
            <div className="text-xl font-semibold text-gray-800">WoodLand Rover Crew</div>
            <div className="text-lg text-gray-600">Welcome Back, Rovers</div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-inp">
              <input
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                required
              />
            </div>
            <div className="form-inp">
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>

            <div className="text-center">
              <a href="./ForgetPassword" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;