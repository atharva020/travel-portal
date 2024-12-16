import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [guides, setGuides] = useState([]);
  const [activeTab, setActiveTab] = useState("bookings");
  const [error, setError] = useState(null);
  const [newGuide, setNewGuide] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [bookingsRes, guidesRes] = await Promise.all([
        fetch("http://localhost:5000/api/bookings", { headers }),
        fetch("http://localhost:5000/api/guides", { headers }),
      ]);

      const bookingsData = await bookingsRes.json();
      const guidesData = await guidesRes.json();

      setBookings(bookingsData);
      setGuides(guidesData);
    } catch (error) {
      setError("Failed to fetch data");
    }
  };

  const handleAddGuide = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/guides", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuide),
      });

      if (!response.ok) throw new Error("Failed to add guide");

      fetchData(); // Refresh the guides list
      setNewGuide({
        title: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
      });
    } catch (error) {
      setError("Failed to add guide");
    }
  };

  const handleDeleteGuide = async (guideId) => {
    if (window.confirm("Are you sure you want to delete this guide?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/guides/${guideId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to delete guide");

        fetchData(); // Refresh the guides list
      } catch (error) {
        setError("Failed to delete guide");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
        <button
          className={`tab-btn ${activeTab === "Add-guides" ? "active" : ""}`}
          onClick={() => setActiveTab("Add-guides")}
        >
          Add Guides
        </button>
      </div>

      <div className="dashboard-content">
        {error && <div className="error-message">{error}</div>}

        {activeTab === "bookings" ? (
          <div className="bookings-section">
            <h2>Recent Bookings</h2>
            <div className="bookings-list">
              {bookings.map((booking) => (
                <div key={booking._id} className="booking-card">
                  <h3>{booking.guideName}</h3>
                  <div className="booking-info">
                    <p>
                      <strong>Customer:</strong> {booking.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {booking.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {booking.phone}
                    </p>
                    <p>
                      <strong>Travelers:</strong> {booking.travelers}
                    </p>
                    <p>
                      <strong>Total Price:</strong> ${booking.totalPrice}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="guides-section">
            <h2>Add New Guide</h2>
            <form onSubmit={handleAddGuide} className="add-guide-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title"
                  value={newGuide.title}
                  onChange={(e) =>
                    setNewGuide({ ...newGuide, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Description"
                  value={newGuide.description}
                  onChange={(e) =>
                    setNewGuide({ ...newGuide, description: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Price"
                  value={newGuide.price}
                  onChange={(e) =>
                    setNewGuide({ ...newGuide, price: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Category"
                  value={newGuide.category}
                  onChange={(e) =>
                    setNewGuide({ ...newGuide, category: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={newGuide.imageUrl}
                  onChange={(e) =>
                    setNewGuide({ ...newGuide, imageUrl: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="add-guide-btn">
                Add Guide
              </button>
            </form>

            <h2>Existing Guides</h2>
            <div className="guides-list">
              {guides.map((guide) => (
                <div key={guide._id} className="guide-card">
                  <img src={guide.imageUrl} alt={guide.title} />
                  <div className="guide-info">
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <p>
                      <strong>Price:</strong> ${guide.price}
                    </p>
                    <p>
                      <strong>Category:</strong> {guide.category}
                    </p>
                    <button
                      onClick={() => handleDeleteGuide(guide._id)}
                      className="delete-btn"
                    >
                      Delete Guide
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
