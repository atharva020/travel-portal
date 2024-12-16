import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Hero from "./components/hero/Hero";
import Guides from "./components/guides/Guides";
import Navbar from "./components/navbar/navbar";
import MyBookings from "./components/bookings/MyBookings";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/admin/Dashboard";
import AdminLogin from "./components/auth/AdminLogin";
import Footer from "./components/footer/Footer";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              isAdmin ? (
                <Navigate to="/admin" />
              ) : (
                <>
                  <Hero />
                  <Guides />
                </>
              )
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute allowedRole="customer">
                <MyBookings />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
