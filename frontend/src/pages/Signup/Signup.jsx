import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.message) {
        setError(data.message);
      } else {
        localStorage.setItem("token", data.token);
        setError("");
        navigate("/");
        setLoggedIn(true);
      }
    } catch (error) {}
  };
  return (
    <>
      <div id="login-container">
        <div id="login-form-container">
          <form id="login-form" onSubmit={handleSubmit}>
            <h1>Create Your Account</h1>
            <div className="input-container">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button type="submit">Sign Up</button>
            <div className="validation-error">
              <span>{error}</span>
            </div>
          </form>

          <div id="create-account">
            Already have an account ? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
