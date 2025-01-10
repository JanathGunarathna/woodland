import React, { useState } from 'react';

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const EnvelopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const CreditCardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const SchoolIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const UserProfilePage = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [address, setAddress] = useState('123 Main St, Anytown USA');
  const [roverRegistrationNumber, setRoverRegistrationNumber] = useState('ABC123');
  const [idNumber, setIdNumber] = useState('12345678');
  const [crewOrSchool, setCrewOrSchool] = useState('Team Robotics');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureUpload = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-6">
        <div className="relative mr-4">
          {profilePicture ? (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              <UserIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <label
            htmlFor="profilePicture"
            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 16v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h1m9 6V4m-9 0L9 8m5-4v8"></path>
            </svg>
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-500">{email}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center">
          <LocationIcon className="w-6 h-6 text-gray-400 mr-2" />
          <span>{address}</span>
        </div>
        <div className="flex items-center">
          <CreditCardIcon className="w-6 h-6 text-gray-400 mr-2" />
          <span>{roverRegistrationNumber}</span>
        </div>
        <div className="flex items-center">
          <EnvelopeIcon className="w-6 h-6 text-gray-400 mr-2" />
          <span>{idNumber}</span>
        </div>
        <div className="flex items-center">
          <SchoolIcon className="w-6 h-6 text-gray-400 mr-2" />
          <span>{crewOrSchool}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;