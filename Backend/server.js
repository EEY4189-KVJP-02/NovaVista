import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, checkConnection } from "./config/db.js";

import eventBookingRoutes from "./routes/eventBookingRoutes.js";
import hallsRouter from "./routes/EventHall.js";
import authRoutes from "./routes/auth.js";
import hotelAvailabilityRoutes from "./routes/HotelAvailabilityRoutes.js";
import hotelBookingRoutes from "./routes/HotelBookingRoutes.js";

// ✅ ADD THIS
import hotelRoutes from "./routes/HotelRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use("/book", eventBookingRoutes);
app.use("/api/halls", hallsRouter);
app.use("/api/auth", authRoutes);

app.use("/api/availability", hotelAvailabilityRoutes);
app.use("/api/hotel-bookings", hotelBookingRoutes);

// ✅ FIX: This route was missing (causing 404)
app.use("/api/hotels", hotelRoutes);

// Optional health route
app.get("/api/health", (req, res) => res.json({ ok: true }));

// Start server
const startServer = async () => {
  try {
    await checkConnection();
    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`✅ Hotels API: http://localhost:${PORT}/api/hotels`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
