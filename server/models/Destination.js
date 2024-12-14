const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: String,
  availableDates: [
    {
      type: Date,
    },
  ],
  maxGuests: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Destination", destinationSchema);
