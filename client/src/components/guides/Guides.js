import React, { useState, useEffect } from "react";
import "./guides.css";
import { useNavigate } from "react-router-dom";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: 1,
    specialRequests: "",
  });
  const guidesPerPage = 6;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

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

  const handleBookNow = (guide) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      localStorage.setItem("pendingBooking", JSON.stringify(guide));
      navigate("/login");
      return;
    }

    if (user.role === "admin") {
      return; // Prevent admin from booking
    }

    setSelectedGuide(guide);
    setIsBookingModalOpen(true);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const bookingData = {
        ...bookingForm,
        userId: user._id,
        guideId: selectedGuide._id,
        guideName: selectedGuide.title,
        totalPrice: selectedGuide.price * bookingForm.travelers,
        status: "pending",
      };

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create booking");
      }

      alert("Booking successful!");
      setIsBookingModalOpen(false);
      setBookingForm({
        name: "",
        email: "",
        phone: "",
        travelers: 1,
        specialRequests: "",
      });
    } catch (error) {
      alert("Failed to create booking. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
              {user?.role !== "admin" && (
                <button
                  className="book-now-btn"
                  onClick={() => handleBookNow(guide)}
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="booking-modal-overlay">
          <div className="booking-modal">
            <button
              className="close-modal"
              onClick={() => setIsBookingModalOpen(false)}
            >
              ×
            </button>
            <h2>Book {selectedGuide.title}</h2>
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Travelers:</label>
                <input
                  type="number"
                  name="travelers"
                  min="1"
                  value={bookingForm.travelers}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Special Requests:</label>
                <textarea
                  name="specialRequests"
                  value={bookingForm.specialRequests}
                  onChange={handleInputChange}
                />
              </div>
              <div className="booking-summary">
                <p>
                  Total Price: ${selectedGuide.price * bookingForm.travelers}
                </p>
              </div>
              <button type="submit" className="submit-booking">
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}

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
