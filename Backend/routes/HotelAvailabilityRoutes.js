import express from "express";
import { Op } from "sequelize";
import HotelBooking from "../models/HotelBooking.js";

const router = express.Router();

// ✅ stock per hotel (later you can move this to DB)
const HOTEL_ROOM_STOCK = {
  1: 10, // Jaffna
  2: 8,  // Kilinochchi
  3: 12, // Mannar
};

router.post("/check", async (req, res) => {
  try {
    const { hotelId, checkIn, checkOut, rooms } = req.body;

    if (!hotelId || !checkIn || !checkOut || !rooms) {
      return res.status(400).json({ message: "Missing fields", isAvailable: false });
    }

    if (checkOut <= checkIn) {
      return res.status(400).json({ message: "Check-out must be after check-in", isAvailable: false });
    }

    const totalStock = HOTEL_ROOM_STOCK[Number(hotelId)] ?? 0;
    if (totalStock === 0) {
      return res.status(404).json({ message: "Hotel stock not found", isAvailable: false });
    }

    // ✅ Overlap rule:
    // existing.check_in < requested.check_out AND existing.check_out > requested.check_in
    const overlappingBookings = await HotelBooking.findAll({
      where: {
        hotel_id: Number(hotelId),
        [Op.and]: [
          { check_in: { [Op.lt]: checkOut } },
          { check_out: { [Op.gt]: checkIn } },
        ],
      },
    });

    const bookedRooms = overlappingBookings.reduce((sum, b) => sum + Number(b.rooms || 0), 0);
    const availableRooms = totalStock - bookedRooms;

    const requestedRooms = Number(rooms);
    const isAvailable = availableRooms >= requestedRooms;

    return res.json({
      hotelId: Number(hotelId),
      checkIn,
      checkOut,
      requestedRooms,
      totalStock,
      bookedRooms,
      availableRooms,
      isAvailable,
    });
  } catch (err) {
    console.error("Availability check error:", err);
    res.status(500).json({ message: "Availability check failed", isAvailable: false });
  }
});

export default router;
