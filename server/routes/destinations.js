const express = require("express");
const router = express.Router();
const Destination = require("../models/Destination");

// Search destinations
router.get("/search", async (req, res) => {
  try {
    const { destination, date, guests } = req.query;

    let query = {};

    if (destination) {
      query.$or = [
        { name: new RegExp(destination, "i") },
        { location: new RegExp(destination, "i") },
      ];
    }

    if (guests) {
      query.maxGuests = { $gte: parseInt(guests) };
    }

    const destinations = await Destination.find(query);
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
