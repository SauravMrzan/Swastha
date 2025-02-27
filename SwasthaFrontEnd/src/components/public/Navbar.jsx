import React, { useState } from "react";
import "../css/Navbar.css";
import "../css/Home.css";
import Menu from "./Dropdown";
import { Link, useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  console.log(location.pathname);
  
  const token = localStorage.getItem('token')
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear any stored user session if needed
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
          className={`${location?.pathname === "/Home" ? "active-tabs" : ""}`}
        >
          <a href="">Home</a>
        </Link>
        <Link
          to="/AllDoctors"
          className={`${
            location?.pathname === "/AllDoctors" ? "active-tabs" : ""
          }`}
        >
          <a href="">All Doctors</a>
        </Link>
        <Link
          to="/About"
          className={`${location?.pathname === "/About" ? "active-tabs" : ""}`}
        >
          <a href="">About</a>
        </Link>
        <Link
          to="/Contact"
          className={`${
            location?.pathname === "/Contact" ? "active-tabs" : ""
          }`}
        >
          <a href="">Contact</a>
        </Link>
      </div>
      
      {token? <button className= "logout-btn" onClick={handleLogout}>Logout</button> : <Menu title="Create Account" />}
    </nav>
  );
};

export default Navbar;
