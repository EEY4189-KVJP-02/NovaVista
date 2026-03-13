import express from "express";
import EventBooking from "../models/EventBooking.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const booking = await EventBooking.create(req.body);
    res.status(201).json({ message: "Booking completed successfully!", booking });
  } catch (err) {
    console.error("Error saving booking:", err);
    res.status(500).json({ message: "Error saving booking" });
  }
});


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
