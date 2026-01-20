import express from "express";
import RoomBooking from "../models/RoomBooking.js";
import EventBooking from "../models/EventBooking.js";
import Room from "../models/Room.js";
import EventHall from "../models/EventHall.js";
import User from "../models/User.js";
import { authenticate, isAdmin } from "../middleware/auth.js";
import { Op } from "sequelize";

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(isAdmin);

// ========== ROOM BOOKINGS MANAGEMENT ==========

// GET all room bookings
router.get("/room-bookings", async (req, res) => {
  try {
    const bookings = await RoomBooking.findAll({
      include: [
        {
          model: Room,
          as: "room",
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
    console.error("Error fetching room bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET single room booking
router.get("/room-bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await RoomBooking.findByPk(id, {
      include: [
        {
          model: Room,
          as: "room",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email", "firstName", "lastName"],
        },
      ],
    });

    if (!booking) {
      return res.status(404).json({ message: "Room booking not found" });
    }

    res.json(booking);
  } catch (error) {
    console.error("Error fetching room booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT update room booking
router.put("/room-bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
      status,
      specialRequests,
    } = req.body;

    const booking = await RoomBooking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Room booking not found" });
    }

    // Update booking
    await booking.update({
      guestName: guestName || booking.guestName,
      guestEmail: guestEmail || booking.guestEmail,
      guestPhone: guestPhone || booking.guestPhone,
      checkInDate: checkInDate || booking.checkInDate,
      checkOutDate: checkOutDate || booking.checkOutDate,
      numberOfGuests: numberOfGuests || booking.numberOfGuests,
      totalPrice: totalPrice || booking.totalPrice,
      status: status || booking.status,
      specialRequests: specialRequests !== undefined ? specialRequests : booking.specialRequests,
    });

    const updatedBooking = await RoomBooking.findByPk(id, {
      include: [
        {
          model: Room,
          as: "room",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email", "firstName", "lastName"],
        },
      ],
    });

    res.json({
      message: "Room booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating room booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE room booking
router.delete("/room-bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await RoomBooking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Room booking not found" });
    }

    await booking.destroy();
    res.json({ message: "Room booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting room booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ========== EVENT BOOKINGS MANAGEMENT ==========

// GET all event bookings
router.get("/event-bookings", async (req, res) => {
  try {
    const bookings = await EventBooking.findAll({
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
router.get("/event-bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await EventBooking.findByPk(id, {
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

// PUT update event booking
router.put("/event-bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      eventName,
      contactName,
      contactEmail,
      contactPhone,
      eventDate,
      numberOfGuests,
      totalPrice,
      status,
      specialRequests,
    } = req.body;

    const booking = await EventBooking.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Event booking not found" });
    }

    // Update booking
    await booking.update({
      eventName: eventName || booking.eventName,
      contactName: contactName || booking.contactName,
      contactEmail: contactEmail || booking.contactEmail,
      contactPhone: contactPhone || booking.contactPhone,
      eventDate: eventDate || booking.eventDate,
      numberOfGuests: numberOfGuests || booking.numberOfGuests,
      totalPrice: totalPrice || booking.totalPrice,
      status: status || booking.status,
      specialRequests: specialRequests !== undefined ? specialRequests : booking.specialRequests,
    });

    const updatedBooking = await EventBooking.findByPk(id, {
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

    res.json({
      message: "Event booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating event booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE event booking
router.delete("/event-bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await EventBooking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Event booking not found" });
    }

    await booking.destroy();
    res.json({ message: "Event booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting event booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ========== CALENDAR VIEW ==========

// GET calendar data (all bookings with dates)
router.get("/calendar", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const whereClause = {};
    if (startDate && endDate) {
      whereClause[Op.or] = [
        {
          checkInDate: {
            [Op.between]: [startDate, endDate],
          },
        },
        {
          checkOutDate: {
            [Op.between]: [startDate, endDate],
          },
        },
      ];
    }

    // Get room bookings
    const roomBookings = await RoomBooking.findAll({
      where: whereClause,
      include: [
        {
          model: Room,
          as: "room",
          attributes: ["id", "type", "branch"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    // Get event bookings
    const eventBookings = await EventBooking.findAll({
      where: startDate && endDate
        ? {
            eventDate: {
              [Op.between]: [startDate, endDate],
            },
          }
        : {},
      include: [
        {
          model: EventHall,
          as: "hall",
          attributes: ["id", "name", "location"],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    // Format calendar data
    const calendarData = {
      roomBookings: roomBookings.map((booking) => ({
        id: booking.id,
        type: "room",
        title: `Room: ${booking.room?.type || "Unknown"}`,
        start: booking.checkInDate,
        end: booking.checkOutDate,
        location: booking.room?.branch || "Unknown",
        guestName: booking.guestName,
        guestEmail: booking.guestEmail,
        status: booking.status,
        booking: booking,
      })),
      eventBookings: eventBookings.map((booking) => ({
        id: booking.id,
        type: "event",
        title: `Event: ${booking.eventName}`,
        start: booking.eventDate,
        end: booking.eventDate,
        location: booking.hall?.location || "Unknown",
        contactName: booking.contactName,
        contactEmail: booking.contactEmail,
        status: booking.status,
        booking: booking,
      })),
    };

    res.json(calendarData);
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
