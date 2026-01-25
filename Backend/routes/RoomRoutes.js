import express from "express";
import { Op } from "sequelize";
import Room from "../models/Room.js";
import RoomBooking from "../models/RoomBooking.js";

const router = express.Router();

// GET /api/rooms
// Optional filters: branch, minPrice, maxPrice, maxGuests, checkInDate, checkOutDate
router.get("/", async (req, res) => {
  try {
    const { branch, minPrice, maxPrice, maxGuests, checkInDate, checkOutDate } = req.query;

    const whereClause = { isActive: true };

    if (branch) whereClause.branch = branch;

    if (minPrice) {
      whereClause.price = { ...(whereClause.price ?? {}), [Op.gte]: parseFloat(minPrice) };
    }
    if (maxPrice) {
      whereClause.price = { ...(whereClause.price ?? {}), [Op.lte]: parseFloat(maxPrice) };
    }
    if (maxGuests) {
      whereClause.maxGuests = { [Op.gte]: parseInt(maxGuests, 10) };
    }

    let rooms = await Room.findAll({ where: whereClause, order: [["price", "ASC"]] });

    // If date range provided, filter out rooms with conflicting bookings
    if (checkInDate && checkOutDate) {
      const bookings = await RoomBooking.findAll({
        where: {
          status: { [Op.in]: ["pending", "confirmed", "checked_in"] },
          [Op.or]: [
            { checkInDate: { [Op.between]: [checkInDate, checkOutDate] } },
            { checkOutDate: { [Op.between]: [checkInDate, checkOutDate] } },
            {
              [Op.and]: [
                { checkInDate: { [Op.lte]: checkInDate } },
                { checkOutDate: { [Op.gte]: checkOutDate } },
              ],
            },
          ],
        },
        attributes: ["roomId"],
      });

      const bookedRoomIds = new Set(bookings.map((b) => Number(b.roomId)));
      rooms = rooms.filter((r) => !bookedRoomIds.has(Number(r.id)));
    }

    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET /api/rooms/:id
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/rooms/:id/availability
router.post("/:id/availability", async (req, res) => {
  try {
    const { id } = req.params;
    const { checkInDate, checkOutDate } = req.body;

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "checkInDate and checkOutDate are required" });
    }
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: "checkOutDate must be after checkInDate" });
    }

    const room = await Room.findByPk(id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const conflictingBooking = await RoomBooking.findOne({
      where: {
        roomId: id,
        status: { [Op.in]: ["pending", "confirmed", "checked_in"] },
        [Op.or]: [
          { checkInDate: { [Op.between]: [checkInDate, checkOutDate] } },
          { checkOutDate: { [Op.between]: [checkInDate, checkOutDate] } },
          {
            [Op.and]: [
              { checkInDate: { [Op.lte]: checkInDate } },
              { checkOutDate: { [Op.gte]: checkOutDate } },
            ],
          },
        ],
      },
    });

    const isAvailable = !conflictingBooking;
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = Number(room.price) * nights;

    res.json({ isAvailable, room, nights, totalPrice });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /api/rooms/:id/book
router.post("/:id/book", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      specialRequests,
    } = req.body;

    if (!guestName || !guestEmail || !guestPhone || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: "checkOutDate must be after checkInDate" });
    }

    const room = await Room.findByPk(id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const guests = Number(numberOfGuests ?? 1);
    if (guests > Number(room.maxGuests)) {
      return res.status(400).json({ message: `Maximum ${room.maxGuests} guests allowed for this room` });
    }

    const conflictingBooking = await RoomBooking.findOne({
      where: {
        roomId: id,
        status: { [Op.in]: ["pending", "confirmed", "checked_in"] },
        [Op.or]: [
          { checkInDate: { [Op.between]: [checkInDate, checkOutDate] } },
          { checkOutDate: { [Op.between]: [checkInDate, checkOutDate] } },
          {
            [Op.and]: [
              { checkInDate: { [Op.lte]: checkInDate } },
              { checkOutDate: { [Op.gte]: checkOutDate } },
            ],
          },
        ],
      },
    });

    if (conflictingBooking) {
      return res.status(409).json({ message: "Room is not available for the selected dates" });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = Number(room.price) * nights;

    const booking = await RoomBooking.create({
      roomId: Number(id),
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      numberOfGuests: guests,
      totalPrice,
      specialRequests: specialRequests || null,
      status: "pending",
    });

    const bookingWithRoom = await RoomBooking.findByPk(booking.id, {
      include: [{ model: Room, as: "room" }],
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: bookingWithRoom || booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
