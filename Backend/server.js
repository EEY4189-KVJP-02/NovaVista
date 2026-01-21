// server.js
import express from "express";
import cors from "cors";
import { checkConnection } from "./config/db.js";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Start server
app.listen(PORT, async () => {
  console.log(`Server listening on ${PORT}`);
  try {
    await checkConnection();
  } catch (error) {
    console.log("Failed to initialize the database", error);
  }
});
