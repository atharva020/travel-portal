import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Travel Guide</Link>
      </div>
      <div className="nav-links">
        <div className="nav-items">
          {user ? (
            <>
              <span className="user-name">Welcome, {user.name}</span>
              {user.role === "admin" ? (
                <Link to="/admin">Dashboard</Link>
              ) : (
                <>
                  <Link to="/">Home</Link>
                  <Link to="/bookings">My Bookings</Link>
                </>
              )}
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/">Home</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
        <div className="language-selector">
          <span className="language-icon">🌐</span>
          <span>EN</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
