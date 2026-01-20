// Simple test script to check if server can start
import dotenv from "dotenv";
dotenv.config();

console.log("Environment variables check:");
console.log("DB_NAME:", process.env.DB_NAME || "NOT SET");
console.log("DB_USER:", process.env.DB_USER || "NOT SET");
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "***SET***" : "NOT SET");
console.log("DB_HOST:", process.env.DB_HOST || "NOT SET");
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "***SET***" : "NOT SET");
console.log("PORT:", process.env.PORT || "3001 (default)");

// Try to import models
try {
  console.log("\nTesting model imports...");
  const User = await import("./models/User.js");
  const Room = await import("./models/Room.js");
  const RoomBooking = await import("./models/RoomBooking.js");
  const EventHall = await import("./models/EventHall.js");
  const EventBooking = await import("./models/EventBooking.js");
  console.log("✓ All models imported successfully");
} catch (error) {
  console.error("✗ Model import failed:", error.message);
  process.exit(1);
}

// Try to connect to database
try {
  console.log("\nTesting database connection...");
  const { sequelize } = await import("./config/db.js");
  await sequelize.authenticate();
  console.log("✓ Database connection successful");
  await sequelize.close();
} catch (error) {
  console.error("✗ Database connection failed:", error.message);
  console.error("  Make sure your .env file has correct database credentials");
  console.error("  And that MySQL/MariaDB is running");
}

console.log("\nTest completed!");
