import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, checkConnection } from "./config/db.js";
import eventBookingRoutes from "./routes/eventBookingRoutes.js";
import hallsRouter from "./routes/EventHall.js";
import authRoutes from "./routes/auth.js";



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
