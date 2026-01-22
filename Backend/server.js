import express from "express";
import cors from "cors";
import hallsRouter from "./routes/EventHall.js";
import { sequelize, checkConnection } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/halls", hallsRouter);

const startServer = async () => {
  try {
    await checkConnection();
    await sequelize.sync({ force: false }); 
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
