// components/hero/Hero.js
import React, { useState } from "react";
import "./hero.css";

const Hero = () => {
  const [searchData, setSearchData] = useState({
    destination: "",
    date: "",
    guests: "",
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/api/destinations/search?destination=${searchData.destination}&date=${searchData.date}&guests=${searchData.guests}`
      );
      const data = await response.json();
      console.log("Search results:", data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Travel around the world</h1>
        <p>
          Trusted by 80 million Travelers. Aalcazar is the world's most
          comprehensive travel, flight and accommodation provider. very easy to
          access on your smarttree and desktop
        </p>

        <form className="search-box" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="City, destination, or hotel name"
            value={searchData.destination}
            onChange={(e) =>
              setSearchData({ ...searchData, destination: e.target.value })
            }
          />
          <input
            type="date"
            placeholder="Date of stay"
            value={searchData.date}
            onChange={(e) =>
              setSearchData({ ...searchData, date: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Add guest"
            value={searchData.guests}
            onChange={(e) =>
              setSearchData({ ...searchData, guests: e.target.value })
            }
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
