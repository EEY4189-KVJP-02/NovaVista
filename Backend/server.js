// server.js
import express from "express";
import cors from "cors";
import { checkConnection, sequelize } from "./config/db.js";
import hallsRouter from "./routes/EventHall.js";
import roomsRouter from "./routes/Room.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import eventBookingRouter from "./routes/eventBooking.js";
import User from "./models/User.js";
import Room from "./models/Room.js";
import RoomBooking from "./models/RoomBooking.js";
import EventHall from "./models/EventHall.js";
import EventBooking from "./models/EventBooking.js";
import Location from "./models/Location.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000'],
  credentials: true,
}));

// Set up associations
try {
  User.hasMany(RoomBooking, { foreignKey: 'userId', as: 'roomBookings' });
  RoomBooking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  User.hasMany(EventBooking, { foreignKey: 'userId', as: 'eventBookings' });
  EventBooking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Room.hasMany(RoomBooking, { foreignKey: 'roomId', as: 'bookings' });
  RoomBooking.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });
  EventHall.hasMany(EventBooking, { foreignKey: 'hallId', as: 'bookings' });
  EventBooking.belongsTo(EventHall, { foreignKey: 'hallId', as: 'hall' });
} catch (err) {
  console.warn('Warning setting up associations:', err.message);
  // Continue anyway - associations might already be set
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api/auth", authRouter);
app.use("/api/halls", hallsRouter);
app.use("/api/rooms", roomsRouter);
app.use("/api/event-bookings", eventBookingRouter);
app.use("/api/admin", adminRouter);

// Start server
app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  try {
    await checkConnection();
    // Sync models with database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized");
  } catch (error) {
    console.error("Failed to initialize the database", error);
    console.error("Server will continue but database features may not work");
    console.error("Please check your .env file and database connection");
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});
