import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, checkConnection } from "./config/db.js";
import eventBookingRoutes from "./routes/eventBookingRoutes.js";
import hallsRouter from "./routes/EventHall.js";
import authRoutes from "./routes/auth.js";
import roomRoutes from "./routes/RoomRoutes.js";
import adminRoomsRoutes from "./routes/adminRooms.js";
import Room, { seedDefaultRoomsIfEmpty } from "./models/Room.js";
import RoomBooking from "./models/RoomBooking.js";



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
app.use("/api/halls", hallsRouter);     // event halls routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/admin", adminRoomsRoutes);




// Start server
const startServer = async () => {
  try {
    await checkConnection();

    // Associations (room-only; kept isolated from existing event/hotel models)
    Room.hasMany(RoomBooking, { foreignKey: "roomId", as: "bookings" });
    RoomBooking.belongsTo(Room, { foreignKey: "roomId", as: "room" });

    await sequelize.sync({ force: false });
    await seedDefaultRoomsIfEmpty();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to start server:", err);
  }
};

startServer();
