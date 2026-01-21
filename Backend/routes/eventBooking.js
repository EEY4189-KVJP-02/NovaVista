import express from "express";
import EventBooking from "../models/EventBooking.js";
import EventHall from "../models/EventHall.js";
import User from "../models/User.js";
import { authenticate } from "../middleware/auth.js";
import { Op } from "sequelize";

const router = express.Router();

// GET all event bookings (for authenticated users - their own bookings)
router.get("/", authenticate, async (req, res) => {
  try {
    const whereClause = {};
    
    // If user is not admin, only show their own bookings
    if (req.user.role !== "admin") {
      whereClause.userId = req.user.id;
    }

    const bookings = await EventBooking.findAll({
      where: whereClause,
      include: [
        {
          model: EventHall,
          as: "hall",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email", "firstName", "lastName"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching event bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET single event booking
router.get("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const whereClause = { id };

    // If user is not admin, only allow access to their own bookings
    if (req.user.role !== "admin") {
      whereClause.userId = req.user.id;
    }

    const booking = await EventBooking.findOne({
      where: whereClause,
      include: [
        {
          model: EventHall,
          as: "hall",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email", "firstName", "lastName"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Event booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching event booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST create new event booking (requires authentication)
router.post("/", authenticate, async (req, res) => {
  try {
    const {
      hallId,
      eventName,
      contactName,
      contactEmail,
      contactPhone,
      eventDate,
      numberOfGuests,
      specialRequests,
    } = req.body;

    // Validate required fields
    if (!hallId || !eventName || !contactName || !contactEmail || !contactPhone || !eventDate || !numberOfGuests) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if hall exists
    const hall = await EventHall.findByPk(hallId);
    if (!hall) {
      return res.status(404).json({ message: "Event hall not found" });
    }

    // Check availability - check for conflicting bookings
    const conflictingBooking = await EventBooking.findOne({
      where: {
        hallId,
        status: {
          [Op.in]: ["pending", "confirmed"],
        },
        eventDate,
      },
    });

    if (conflictingBooking) {
      return res.status(409).json({ message: "Event hall is not available for the selected date" });
    }

    // Calculate total price (use hall price if available, otherwise default)
    const totalPrice = hall.price ? parseFloat(hall.price) : 10000;

    // Create booking
    const booking = await EventBooking.create({
      userId: req.user.id,
      hallId,
      eventName,
      contactName,
      contactEmail,
      contactPhone,
      eventDate,
      numberOfGuests,
      totalPrice,
      specialRequests,
      status: "pending",
    });

    const bookingWithDetails = await EventBooking.findByPk(booking.id, {
      include: [
        {
          model: EventHall,
          as: "hall",
        },
      ],
    });

    res.status(201).json({
      message: "Event booking created successfully",
      booking: bookingWithDetails,
    });
  } catch (error) {
    console.error("Error creating event booking:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default router;
