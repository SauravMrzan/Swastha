import React from "react";
import "../css/Navbar.css";
import "../css/Home.css";
import Menu from "./Dropdown";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/Home"); // Redirect to landing page
  };

  return (
    <nav className="header">
      <div className="logo">Swastha</div>

      <div className="nav-t">
        <Link
          to="/Home"
          className={`${location.pathname === "/Home" ? "active-tabs" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/AllDoctors"
          className={`${
            location.pathname === "/AllDoctors" ? "active-tabs" : ""
          }`}
        >
          All Doctors
        </Link>
        <Link
          to="/About"
          className={`${location.pathname === "/About" ? "active-tabs" : ""}`}
        >
          About
        </Link>
        <Link
          to="/Contact"
          className={`${location.pathname === "/Contact" ? "active-tabs" : ""}`}
        >
          Contact
        </Link>
      </div>

      {token ? (
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Menu title="Create Account" />
      )}
    </nav>
  );
};

export default Navbar;
