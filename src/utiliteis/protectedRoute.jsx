// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/authContext";

const ProtectedRoute = ({ redirectTo, roles }) => {
  const { auth, logout, hasPermissions } = useAuth();

  if (!auth.token) {
    // If not authenticated, redirect to the login page or specified route
    return <Navigate to={redirectTo} />;
  }
  if (!hasPermissions(roles)) {
    logout(); // Uncomment if you want to log the user out
    return <Navigate to={redirectTo} />; // Redirect to the login page or another route
  }
  // If authenticated, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
