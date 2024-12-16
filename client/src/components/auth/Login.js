import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      console.log("Login response data:", data);

      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      };

      console.log("Storing user data:", userData);

      localStorage.setItem("user", JSON.stringify(userData));

      // Check if there was a pending booking
      const pendingBooking = localStorage.getItem("pendingBooking");
      if (pendingBooking) {
        localStorage.removeItem("pendingBooking");
        navigate("/guides");
      } else if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form-container">
          <h2>Login ✌️</h2>
          <p className="subtitle">How do I get started ?</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <div className="forgot-password">
                <a href="/forgot-password">Forgot Password?</a>
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="login-button">
              Login
            </button>

            <div className="admin-login-link">
              <p>
                Are you an admin? <a href="/admin-login">Login as Admin</a>
              </p>
            </div>
          </form>
        </div>

        <div className="login-image-container">
          <div className="content">
            <img src="/images/login.png" alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
