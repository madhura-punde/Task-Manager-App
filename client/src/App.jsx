import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Entry/SignIn";
import Login from "./pages/Entry/LogIn";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/User/Dashboard";
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
            element={<ProtectedRoute element={Dashboard} />}
          />

          <Route
            path="/admin-dashboard"
            element={<ProtectedRoute element={AdminDashboard} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
