import React, { useState } from 'react';
import { UserPlusIcon, ImageIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle, AlertDialog, AlertDialogAction } from '../components/ui/alert.tsx';
import LoginNavbar from './loginNavbar';

const CreateAccountPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [address, setAddress] = useState('');
  const [roverRegistrationNumber, setRoverRegistrationNumber] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [crewOrSchool, setCrewOrSchool] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add account creation logic here
    setShowSuccessAlert(true);
  };

  const handleProfilePictureUpload = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleCloseSuccessAlert = () => {
    setShowSuccessAlert(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <LoginNavbar/>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <UserPlusIcon className="w-8 h-8 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold">Create Account</h2>
          </div>
          <a href="/login" className="text-blue-600 hover:underline">
            Already have an account? Login
          </a>
        </div>

        {showSuccessAlert && (
          <Alert variant="success" className="mb-6">
            <AlertTitle>Account Created!</AlertTitle>
            <AlertDescription>
              Your account has been successfully created. You can now log in to the Woodland Rovers platform.
            </AlertDescription>
            <AlertDialogAction onClick={handleCloseSuccessAlert}>Close</AlertDialogAction>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="roverRegistrationNumber" className="block text-gray-700 font-medium mb-2">
              Rover Registration Number
            </label>
            <input
              type="text"
              id="roverRegistrationNumber"
              value={roverRegistrationNumber}
              onChange={(e) => setRoverRegistrationNumber(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="idNumber" className="block text-gray-700 font-medium mb-2">
              ID Number
            </label>
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="crewOrSchool" className="block text-gray-700 font-medium mb-2">
              Crew or School
            </label>
            <input
              type="text"
              id="crewOrSchool"
              value={crewOrSchool}
              onChange={(e) => setCrewOrSchool(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="role" className="block text-gray-700 font-medium mb-2">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="leader">Leader</option>
            </select>
          </div>
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
              {profilePicture && (
                <span className="ml-4 text-gray-700">{profilePicture.name}</span>
              )}
            </div>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </div>
          <button
            type="submit"
            className="col-span-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccountPage;