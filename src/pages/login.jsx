import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import LoginNavbar from "./loginNavbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-red-60 py-16">
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <LoginNavbar />
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <div className="flex justify-center mb-6">
            {/* <LogOutIcon className="w-12 h-12 text-blue-600" /> */}
            <img
              src="/images/woodland.jpg"
              alt="Woodland Rovers Logo"
              className="w-38 h-38 mb-10 rounded-full shadow-lg object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
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
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
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
            {/* <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Login
          </button> */}
            <button class="cssbuttons-io-button">
              Log In
              <div class="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
