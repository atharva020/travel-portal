const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const destinationRoutes = require("./routes/destinations");
app.use("/api/destinations", destinationRoutes);

const guidesRouter = require("./routes/guides");
app.use("/api/guides", guidesRouter);

const bookingsRouter = require("./routes/bookings");
app.use("/api/bookings", bookingsRouter);

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
