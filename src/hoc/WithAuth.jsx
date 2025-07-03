import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthToken } from "../helpers/localstorage";
import Navbar from "../components/Navbar";

const ProtectedRoute = ({ children, isPublic = false }) => {
  const token = getAuthToken();
  if (!token && !isPublic) {
    return <Navigate to="/login" replace />;
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
