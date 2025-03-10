import React from "react";
import { Navigate } from "react-router-dom";

// This function will be used to check if the user is authenticated
const ProtectedRoute = ({ element: Component, role, ...rest }) => {
  // console.log(Component, role, rest);
  const token = localStorage.getItem("x-auth-token");

  // If the token doesn't exist, redirect to the login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decode the JWT token to get the user role
  const userRole = JSON.parse(atob(token.split(".")[1]))?.role; // Decoding JWT to get role info

  // If the role prop is provided and it doesn't match the user's role, redirect to the login page
  if (role && role !== userRole) {
    return <Navigate to="/login" />;
  }

  // If authenticated, allow access to the protected route
  return <Component {...rest} />; // Render the component passed as the 'element' prop
};

export default ProtectedRoute;
