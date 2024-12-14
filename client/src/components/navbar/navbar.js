import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo"></div>
      <div className="nav-links">
        <a href="#download">Download App</a>
        <a href="#partner">Partner With Us</a>
        <a href="#installment">Installment</a>
        <a href="#saved">Saved</a>
        <a href="#booking">My Booking</a>
        <div className="language-selector">
          <span className="language-icon">🌐</span>
          EN
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
