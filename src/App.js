import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import axios from 'axios';

// Page imports
import Home from './pages/Home';
import About from './pages/about';
import Project from './pages/project';
import Event from './pages/event';
import Contact from './pages/contact';
import MyNavbar from './pages/MyNavbar';
import CreateAccountPage from './pages/createAccount';
import UserProfilePage from './pages/profile';
import Login from './pages/login';
import ForgetPassword from './pages/forgetPassword';
import OtpPage from './pages/otp';
import EditProject from './pages/editProject';
import AddProject from './pages/addProject';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ProtectedRoute from './components/ui/ProtectedRoute';
import { UserProvider } from './components/utils/UserContext';
import './index.css';

const baseUrl = "http://localhost:5000/api";

const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  LEADER: 'leader'
};

function AppContent() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get(`${baseUrl}/account`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.data);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
      })
      .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const hideNavbar = ['/login', '/create-account', '/forgetPassword', '/OtpPage'].includes(location.pathname);

  return (
    <UserProvider>
    <div className="min-h-screen bg-red-60 py-16">
      <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
        {!hideNavbar && <MyNavbar userRole={user?.role} />}

        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            user ? <Navigate to="/" replace /> : <Login />
          } />
          <Route path="/create-account" element={
            user ? <Navigate to="/" replace /> : <CreateAccountPage />
          } />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/OtpPage" element={<OtpPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT]} userRole={user?.role}>
              <Home />
            </ProtectedRoute>
          } />

          <Route path="/about" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT]} userRole={user?.role}>
              <About />
            </ProtectedRoute>
          } />

          <Route path="/project" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT]} userRole={user?.role}>
              <Project />
            </ProtectedRoute>
          } />

          {/* Admin-only routes */}
          <Route path="/editProject" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]} userRole={user?.role}>
              <EditProject />
            </ProtectedRoute>
          } />

          <Route path="/addProject" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]} userRole={user?.role}>
              <AddProject />
            </ProtectedRoute>
          } />

          {/* Mixed-access routes */}
          <Route path="/event" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT]} userRole={user?.role}>
              <Event />
            </ProtectedRoute>
          } />

          <Route path="/contact" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT]} userRole={user?.role}>
              <Contact />
            </ProtectedRoute>
          } />

          <Route path="/user-profile" element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.TEACHER, ROLES.STUDENT]} userRole={user?.role}>
              <UserProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
    </UserProvider>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
export { baseUrl };