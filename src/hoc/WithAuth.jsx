import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthToken } from '../helpers/localstorage';
import Navbar from '../components/Navbar';

const ProtectedRoute = ({ children, isPublic = false }) => {
  const token = getAuthToken();
  const location = useLocation();

  if (!token && !isPublic) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (token && isPublic) {
    return <Navigate to="/" replace />;
  }

  return !isPublic ? (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  ) : (
    children
  );
};

export default ProtectedRoute;
