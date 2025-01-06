import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithEmailAndPassword } from '../components/utils/auth';
import { useUser } from '../components/utils/UserContext';
import LoginNavbar from "./loginNavbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { user } = await loginWithEmailAndPassword(email, password);
      setUser(user); // Update global user state
      
      // Redirect based on role
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'teacher':
          navigate('/teacher/dashboard');
          break;
        case 'leader':
          navigate('/leader/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="form-inp">
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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