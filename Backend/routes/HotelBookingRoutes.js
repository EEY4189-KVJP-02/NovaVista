import express from "express";
import { Op } from "sequelize";
import HotelBooking from "../models/HotelBooking.js";

const router = express.Router();

const HOTEL_ROOM_STOCK = { 1: 10, 2: 8, 3: 12 };

router.post("/", async (req, res) => {
  try {
    // ✅ accept both camelCase and snake_case from frontend
    const hotel_id = Number(req.body.hotel_id ?? req.body.hotelId);
    const check_in = req.body.check_in ?? req.body.checkIn;
    const check_out = req.body.check_out ?? req.body.checkOut;
    const rooms = Number(req.body.rooms);
    const customer_name = req.body.customer_name ?? req.body.customerName ?? null;
    const customer_email = req.body.customer_email ?? req.body.customerEmail ?? null;

    if (!hotel_id || !check_in || !check_out || !rooms) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (check_out <= check_in) {
      return res.status(400).json({ message: "Check-out must be after check-in" });
    }

    const totalStock = HOTEL_ROOM_STOCK[hotel_id] ?? 0;

    const overlapping = await HotelBooking.findAll({
      where: {
        hotel_id,
        [Op.and]: [
          { check_in: { [Op.lt]: check_out } },
          { check_out: { [Op.gt]: check_in } },
        ],
      },
    });

    const bookedRooms = overlapping.reduce((sum, b) => sum + Number(b.rooms || 0), 0);
    const availableRooms = totalStock - bookedRooms;

    if (availableRooms < rooms) {
      return res.status(409).json({
        message: "Not enough rooms available",
        availableRooms,
      });
    }

    const booking = await HotelBooking.create({
      hotel_id,
      check_in,
      check_out,
      rooms,
      customer_name,
      customer_email,
    });

    res.status(201).json({ message: "Booking saved!", booking });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ message: "Error saving booking" });
  }
});

router.get("/", async (req, res) => {
  const bookings = await HotelBooking.findAll({ order: [["createdAt", "DESC"]] });
  res.json(bookings);
});

export default router;
