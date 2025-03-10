// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Login from "./pages/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/" element={<Login />} /> */}

          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} role="User" />}
          />

          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={AdminDashboard} role="Admin" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
