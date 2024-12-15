const express = require("express");
const router = express.Router();
const Guide = require("../models/Guide");

// Get all guides
router.get("/", async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new guide
router.post("/", async (req, res) => {
  const guide = new Guide({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    category: req.body.category,
  });

  try {
    const newGuide = await guide.save();
    res.status(201).json(newGuide);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
