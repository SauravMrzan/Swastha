// import React, { useState } from "react";
// import "../css/Navbar.css";
// import "../css/Home.css";
// import Menu from "../public/Dropdown";
// import { Link } from "react-router-dom";

// import { useLocation } from "react-router-dom";

// const DocNavbar = () => {
//   const location = useLocation();

//   console.log(location.pathname);

//   return (
//     <nav className="header">
//       <div className="logo">Swastha</div>

//       <div className="nav-t"></div>
//       <Menu title="Create Account" />
//     </nav>
//   );
// };

// export default DocNavbar;

import React from "react";
import "../css/DocNavbar.css";

import { Link, useNavigate } from "react-router-dom";

const DocNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored user session if needed
    console.log("Logging out...");
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
