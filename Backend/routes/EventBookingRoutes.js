import express from "express";
import EventBooking from "../models/EventBooking.js";

const router = express.Router();

// POST /book - create booking
router.post("/", async (req, res) => {
  console.log("Received data:", req.body); // 🔹 log frontend data
  try {
    const booking = await EventBooking.create(req.body);
    console.log("Saved to DB:", booking.toJSON()); // 🔹 log DB result
    res.status(201).json({ message: "Booking completed successfully!", booking });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "Error saving booking" });
  }
});


// GET /book - fetch all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await EventBooking.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: " Failed to fetch bookings" });
  }
});

export default router;
