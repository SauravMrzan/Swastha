import React from "react";
import "../css/DocNavbar.css";

import { Link, useNavigate } from "react-router-dom";

const DocNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user session if needed
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("doctor");
    navigate("/Home"); // Redirect to landing page
  };

  return (
    <nav className="header">
      <div className="logo">Swastha</div>
      <div className="type">Doctor</div>

      {/* Logout Button */}
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default DocNavbar;
