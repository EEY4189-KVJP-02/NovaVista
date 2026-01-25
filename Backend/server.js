import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { sequelize, checkConnection } from "./config/db.js";

import eventBookingRoutes from "./routes/eventBookingRoutes.js";
import hallsRouter from "./routes/EventHall.js";
import authRoutes from "./routes/auth.js";
import roomRoutes from "./routes/RoomRoutes.js";
import adminRoomsRoutes from "./routes/adminRooms.js";
import Room, { seedDefaultRoomsIfEmpty } from "./models/Room.js";
import RoomBooking from "./models/RoomBooking.js";
import User from "./models/user.js";
import { seedDefaultEventHallsIfEmpty } from "./models/EventHall.js";
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
    allowedHeaders: ["Content-Type", "Authorization", "Authorization"],
  })
);

// Routes
app.use("/book", eventBookingRoutes);
app.use("/api/halls", hallsRouter);
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/admin", adminRoomsRoutes);

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

    // Associations (room-only; kept isolated from existing event/hotel models)
    Room.hasMany(RoomBooking, { foreignKey: "roomId", as: "bookings" });
    RoomBooking.belongsTo(Room, { foreignKey: "roomId", as: "room" });

    await sequelize.sync({ force: false });
    await seedDefaultRoomsIfEmpty();
    await seedDefaultEventHallsIfEmpty();

    // Seed default admin user (so admin works without signup)
    const adminEmail = "admin@gmail.com";
    const adminPassword = "admin123";
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
      console.log(`Seeded default admin user: ${adminEmail}`);
    } else if (existingAdmin.role !== "admin") {
      await existingAdmin.update({ role: "admin" });
      console.log(`Promoted existing user to admin: ${adminEmail}`);
    }

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log(`✅ Hotels API: http://localhost:${PORT}/api/hotels`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();
