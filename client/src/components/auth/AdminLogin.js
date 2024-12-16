import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Hardcoded admin credentials
  const ADMIN_EMAIL = "admin@admin.com";
  const ADMIN_PASSWORD = "admin123";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check against hardcoded admin credentials
    if (
      formData.email === ADMIN_EMAIL &&
      formData.password === ADMIN_PASSWORD
    ) {
      // Create admin user object
      const adminUser = {
        id: "admin-id",
        name: "Admin",
        email: ADMIN_EMAIL,
        role: "admin",
      };

      // Store admin data in localStorage
      localStorage.setItem("user", JSON.stringify(adminUser));
      localStorage.setItem("token", "admin-token");

      // Redirect to admin dashboard
      navigate("/admin");
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter admin email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter admin password"
            />
          </div>
          <button type="submit" className="auth-button">
            Login as Admin
          </button>
          <div className="auth-links">
            <button
              type="button"
              className="link-button"
              onClick={() => navigate("/login")}
            >
              Customer Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
