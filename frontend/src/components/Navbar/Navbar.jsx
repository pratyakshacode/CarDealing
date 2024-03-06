import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        {!loggedIn && (
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        )}
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
        <li>
          <Link to={"/about_us"}>About Us</Link>
        </li>
      </ul>

      {loggedIn && (
        <button
          id="logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            setLoggedIn(false);
          
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar;
