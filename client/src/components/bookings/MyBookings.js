import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./myBookings.css";
import Footer from "../footer/Footer";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchBookings();
  }, [navigate, user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/user/${user._id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      setBookings(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (!user) return null;
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <div className="no-bookings">
          <p>You haven't made any bookings yet.</p>
          <button onClick={() => navigate("/")}>Browse Guides</button>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h3>{booking.guideName}</h3>
              <div className="booking-details">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>Travelers:</strong> {booking.travelers}
                </p>
                <p>
                  <strong>Total Price:</strong> ${booking.totalPrice}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${booking.status}`}>
                    {booking.status}
                  </span>
                </p>
              </div>
              {booking.specialRequests && (
                <p className="special-requests">
                  <strong>Special Requests:</strong> {booking.specialRequests}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
