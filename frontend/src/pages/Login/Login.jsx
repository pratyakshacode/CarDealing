import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
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
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <div id="login-container">
        <div id="login-form-container">
          <form id="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
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
            <button type="submit">Login</button>
            <div className="validation-error">
              <span>{error}</span>
            </div>
          </form>
          <div id="create-account">
            Doesn't have an account ? <Link to="/signup">Create Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
