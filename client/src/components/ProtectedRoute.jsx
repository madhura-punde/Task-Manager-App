import React from "react";
import { Navigate } from "react-router-dom";

// This function will be used to check if the user is authenticated
const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  const token = localStorage.getItem("x-auth-token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  const userRole = JSON.parse(atob(token.split(".")[1]))?.role;

  if (role && role !== userRole) {
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the protected route
  return <Component {...rest} />;
};

export default ProtectedRoute;
