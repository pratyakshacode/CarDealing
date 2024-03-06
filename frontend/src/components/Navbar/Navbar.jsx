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
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/cars"}>Cars</Link>
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
      </div>
    </nav>
  );
};

export default Navbar;
