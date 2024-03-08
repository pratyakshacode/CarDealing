import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  const token = localStorage.getItem("token");
  if (token) {
    const { exp } = jwtDecode(token);

    if (Date.now() >= exp * 1000) {
      setLoggedIn(false);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  const role = token ? jwtDecode(token).role : null;

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
      {loggedIn && (
        <button
          id="logout-button"
          onClick={() => {
            setLoggedIn(false);
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          logout
        </button>
      )}
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
          {role === "dealer" && (
            <li>
              <Link to={"/cars/addCar"} onClick={() => setToggle(!toggle)}>
                Add New Car
              </Link>
            </li>
          )}
          {role === "dealer" && (
            <li>
              <Link to={"/cars/mycars"} onClick={() => setToggle(!toggle)}>
                Your Added Cars
              </Link>
            </li>
          )}
          <li>
            <Link to={"/cars"} onClick={() => setToggle(!toggle)}>
              All Cars
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
