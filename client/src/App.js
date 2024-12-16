import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/hero/Hero";
import Guides from "./components/guides/Guides";
import Navbar from "./components/navbar/navbar";
import MyBookings from "./components/bookings/MyBookings";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
