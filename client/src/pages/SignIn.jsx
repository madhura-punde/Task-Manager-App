// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignUpService } from "./authService";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await SignUpService({
        email,
        password,
      });

      // Check if the signup was successful
      if (response.status === 200) {
        console.log(response);
        alert(response.data.message); // Show success message
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      // Handle any errors
      if (error.response) {
        console.log(error);
        alert(error.response.data.message); // Show error message from backend
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </div>
  );
};

export default SignIn;
