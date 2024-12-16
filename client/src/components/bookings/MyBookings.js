import React, { useState, useEffect } from "react";
import "./myBookings.css";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings");

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch bookings");
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!bookings || bookings.length === 0) {
    return <div className="no-bookings">No bookings found</div>;
  }

  return (
    <div className="my-bookings">
      <h2>My Bookings</h2>
      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-header">
              <h3>{booking.guideName}</h3>
              <span className="booking-date">
                {new Date(booking.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="booking-details">
              <p>
                <strong>Name:</strong> {booking.name}
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
              {booking.specialRequests && (
                <p>
                  <strong>Special Requests:</strong> {booking.specialRequests}
                </p>
              )}
              <p className="total-price">
                <strong>Total Price:</strong> ${booking.totalPrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
