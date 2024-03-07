import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
        {!loggedIn && (
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        )}

      </ul>
      {loggedIn && <button
          id="logout-button"
          onClick={() => {
            setLoggedIn(false);
            localStorage.removeItem("token");
          }}
        >
          logout
        </button>}
      <button onClick={() => setToggle(!toggle)} id="toggle-sidebar-button">
        {!toggle ? "|||" : "X"}
      </button>

      <div
        id="side-navigation-bar"
        className={
          toggle ? "show-side-navigation-bar" : "hide-side-navigation-bar"
        }
      >
        <ul>
          {!loggedIn && (
            <li>
              <Link to={"/login"} onClick={() => setToggle(!toggle)}>
                Login
              </Link>
            </li>
          )}
          <li>
            <Link to={"/"} onClick={() => setToggle(!toggle)}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/cars"} onClick={() => setToggle(!toggle)}>
              Cars
            </Link>
          </li>
          <li>
            <Link to={"/contact"} onClick={() => setToggle(!toggle)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
