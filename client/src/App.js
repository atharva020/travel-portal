import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero/Hero";
import Guides from "./components/guides/Guides";
import Navbar from "./components/navbar/navbar";
import MyBookings from "./components/bookings/MyBookings";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/admin/Dashboard";
import AdminLogin from "./components/auth/AdminLogin";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Guides />
              </>
            }
          />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
