const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("Fetching all bookings");
    const bookings = await Booking.find().sort({ createdAt: -1 });
    console.log("Found bookings:", bookings);
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
