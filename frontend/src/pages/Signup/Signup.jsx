import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, location, role }),
      });

      const data = await response.json();
      if (data.message) {
        setError(data.message);
      } else {
        setError("");
        navigate("/");
      }
    } catch (error) {}
  };
  return (
    <>
      <div id="signup-container">
        <div id="login-form-container">
          <form id="login-form" onSubmit={handleSubmit}>
            <h1>Create Your Account</h1>
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="input-container">
              <label htmlFor="role">You are : </label>
              <select
                name="role"
                id="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="dealer">Dealer</option>
              </select>
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
