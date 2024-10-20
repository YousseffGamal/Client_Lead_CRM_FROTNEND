// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../store/authContext";

const ProtectedRoute = ({ redirectTo, roles }) => {
  const { auth, logout } = useAuth();

  if (!auth.token) {
    // If not authenticated, redirect to the login page or specified route
    logout();
    return <Navigate to={redirectTo} />;
  }

  // If authenticated, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
