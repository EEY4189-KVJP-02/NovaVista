import express from "express";
import cors from "cors";
import { sequelize, checkConnection } from "./config/db.js";
import eventBookingRoutes from "./routes/eventBookingRoutes.js";

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
import hallsRouter from "./routes/EventHall.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

// Routes
app.use("/book", eventBookingRoutes);   // booking routes
app.use("/api/auth", authRouter);
app.use("/api/halls", hallsRouter);     // event halls routes
app.use("/api/rooms", roomsRouter);
app.use("/api/event-bookings", eventBookingRouter);
app.use("/api/admin", adminRouter);





// Start server
const startServer = async () => {
  try {
    await checkConnection();
    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err);
  }
};

startServer();
