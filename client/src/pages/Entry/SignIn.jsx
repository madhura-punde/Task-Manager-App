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

      if (response.status === 200) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
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
