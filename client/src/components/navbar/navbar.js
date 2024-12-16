import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Travel Guide</Link>
      </div>
      <div className="nav-links">
        <a href="#download">Download App</a>
        <a href="#partner">Partner With Us</a>
        <Link to="/bookings">My Bookings</Link>
        <div className="language-selector">
          <span className="language-icon">🌐</span>
          EN
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
