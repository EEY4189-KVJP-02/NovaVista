import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize, checkConnection } from "./config/db.js";
import eventBookingRoutes from "./routes/eventBookingRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware to parse JSON
app.use(express.json());

//  Enable CORS for React dev server
app.use(cors({
  origin: "http://localhost:3000", // allow React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));

//  Routes
app.use("/book", eventBookingRoutes);

//  Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  try {
    await checkConnection();
    await sequelize.sync({ alter: true });
    console.log("Database synced ");
  } catch (err) {
    console.error(err);
  }
});
