import React, { useState, useEffect } from "react";
import "./guides.css";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const guidesPerPage = 6;

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/guides");
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  // Get filtered guides based on active tab
  const filteredGuides =
    activeTab === "All"
      ? guides
      : guides.filter((guide) => guide.category === activeTab);

  // Get current guides
  const indexOfLastGuide = currentPage * guidesPerPage;
  const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
  const currentGuides = filteredGuides.slice(
    indexOfFirstGuide,
    indexOfLastGuide
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const tabs = ["All", "Trending", "Features"];

  return (
    <div className="guides-section">
      <h2>Guides for your next vacation</h2>
      <p className="guides-subtitle">
        Check out this week's selection of popular products that might catch
        your eye, and don't
      </p>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPage(1); // Reset to first page when changing tabs
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="guides-grid">
        {currentGuides.map((guide) => (
          <div key={guide._id} className="guide-card">
            <img src={guide.imageUrl} alt={guide.title} />
            <div className="guide-info">
              <div className="guide-header">
                <h3>{guide.title}</h3>
                <span className="price">${guide.price}</span>
              </div>
              <p className="description">{guide.description}</p>
              <button className="read-more">Read more</button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Back page
          </button>
          <div className="page-numbers">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <button
            className="next"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next page
          </button>
        </div>
      )}
    </div>
  );
};

export default Guides;
