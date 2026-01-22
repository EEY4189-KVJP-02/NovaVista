// config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
 {
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
 }
  
);

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
};
