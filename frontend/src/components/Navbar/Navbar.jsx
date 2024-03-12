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
      <button onClick={() => setToggle(!toggle)} id="toggle-sidebar-button">
        {!toggle ? "|||" : "X"}
      </button>

      {toggle && (
        <div id="close-sidebar-cover" onClick={() => setToggle(!toggle)} />
      )}
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
                Add a Car
              </Link>
            </li>
          )}
          {role === "dealer" && (
            <li>
              <Link to={"/cars/mycars"} onClick={() => setToggle(!toggle)}>
                My Added Cars
              </Link>
            </li>
          )}

          {loggedIn && (
            <li>
              <Link to={"/mydeals"} onClick={() => setToggle(!toggle)}>
                My Deals
              </Link>
            </li>
          )}
          {loggedIn && (
            <li>
              <Link to={"/cars"} onClick={() => setToggle(!toggle)}>
                All Cars
              </Link>
            </li>
          )}
          <li>
            <Link to={"/contact"} onClick={() => setToggle(!toggle)}>
              Contact
            </Link>
          </li>

          {loggedIn && (
            <li id="logout-li">
              <button
                id="logout-button"
                onClick={() => {
                  setLoggedIn(false);
                  setToggle(!toggle);
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
