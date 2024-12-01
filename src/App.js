import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/about';
import Project from './pages/project';
import Event from './pages/event';
import Contact from './pages/contact';
import './index.css';
import MyNavbar from './pages/MyNavbar';
import CreateAccountPage from './pages/createAccount';
import UserProfilePage from './pages/profile';
import Login from './pages/login';
import ForgetPassword from './pages/forgetPassword';
import OtpPage from './pages/otp';

function App() {
  const location = useLocation();
  

  return (
    <div className="min-h-screen bg-red-60 py-16 ">
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white ">
        {/* Render MyNavbar only if the path is not /login or /create-account */}
        {location.pathname !== "/login" && location.pathname !== "/create-account" && <MyNavbar />}

        {/* Routes */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/event" element={<Event />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/OtpPage" element={<OtpPage />} />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
