import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon, ImageIcon } from 'lucide-react';
import LoginNavbar from './loginNavbar';
import { authService } from '../services/authService';

const CreateAccountPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    profilePicture: null,
    address: '',
    roverRegistrationNumber: '',
    idNumber: '',
    crewOrSchool: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, files } = e.target;
    
    // Handle file upload separately
    if (id === 'profilePicture') {
      setFormData(prev => ({
        ...prev,
        profilePicture: files ? files[0] : null
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: undefined
      }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    // Other required fields
    const requiredFields = [
      'address', 
      'roverRegistrationNumber', 
      'idNumber', 
      'crewOrSchool'
    ];

    requiredFields.forEach(field => {
      if (!formData[field]?.trim()) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...submitData } = formData;
      
      // Call create account service
      const response = await authService.createAccount(submitData);
      
      // Show success message or redirect to login
      navigate('/login', { 
        state: { 
          message: 'Account created successfully. Please log in.' 
        } 
      });
    } catch (err) {
      // Handle server errors
      setServerError(err.message || 'Account creation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <LoginNavbar />
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <UserPlusIcon className="w-8 h-8 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold">Create Account</h2>
          </div>
          <a href="/login" className="text-blue-600 hover:underline">
            Already have an account? Login
          </a>
        </div>

        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded py-2 px-3 focus:outline-none 
                ${errors.name 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'}`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded py-2 px-3 focus:outline-none 
                ${errors.email 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'}`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Inputs */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full border rounded py-2 px-3 focus:outline-none 
                ${errors.password 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'}`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full border rounded py-2 px-3 focus:outline-none 
                ${errors.confirmPassword 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'}`}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Other Form Fields (Address, Registration Number, etc.) */}
          {[
            { id: 'address', label: 'Address' },
            { id: 'roverRegistrationNumber', label: 'Rover Registration Number' },
            { id: 'idNumber', label: 'ID Number' },
            { id: 'crewOrSchool', label: 'Crew or School' }
          ].map(({ id, label }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
                {label}
              </label>
              <input
                type="text"
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className={`w-full border rounded py-2 px-3 focus:outline-none 
                  ${errors[id] 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-gray-300 focus:border-blue-500'}`}
                required
              />
              {errors[id] && (
                <p className="text-red-500 text-xs mt-1">{errors[id]}</p>
              )}
            </div>
          ))}

          {/* Role Selection */}
          <div className="col-span-2">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full border rounded py-2 px-3 focus:outline-none 
                ${errors.role 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'}`}
              required
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="leader">Leader</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          {/* Profile Picture Upload */}
          <div className="col-span-2">
            <label htmlFor="profilePicture" className="block text-gray-700 font-medium mb-2">
              Profile Picture
            </label>
            <div className="flex items-center">
              <label
                htmlFor="profilePicture"
                className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <ImageIcon className="w-5 h-5 mr-2" />
                Upload
              </label>
              {formData.profilePicture && (
                <span className="ml-4 text-gray-700">
                  {formData.profilePicture.name}
                </span>
              )}
            </div>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="col-span-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;