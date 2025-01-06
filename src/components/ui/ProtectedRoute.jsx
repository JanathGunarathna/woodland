// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuthorization } from './services/auth';

const ProtectedRoute = ({ 
  children, 
  allowedRoles, 
  userRole 
}) => {
  const isAuthorized = checkAuthorization(userRole, allowedRoles);

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;