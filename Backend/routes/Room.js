import express from "express";
import Room from "../models/Room.js";
import RoomBooking from "../models/RoomBooking.js";
import { Op } from "sequelize";

// Set up associations
Room.hasMany(RoomBooking, { foreignKey: "roomId", as: "bookings" });
RoomBooking.belongsTo(Room, { foreignKey: "roomId", as: "room" });

const router = express.Router();

// GET all rooms with optional filters
router.get("/", async (req, res) => {
  try {
    const { branch, minPrice, maxPrice, maxGuests, checkInDate, checkOutDate } = req.query;
    
    const whereClause = {
      isActive: true,
    };

    if (branch) {
      whereClause.branch = branch;
    }

    if (minPrice) {
      whereClause.price = { ...whereClause.price, [Op.gte]: parseFloat(minPrice) };
    }

    if (maxPrice) {
      whereClause.price = { ...whereClause.price, [Op.lte]: parseFloat(maxPrice) };
    }

    if (maxGuests) {
      whereClause.maxGuests = { [Op.gte]: parseInt(maxGuests) };
    }

    let rooms = await Room.findAll({
      where: whereClause,
      order: [["price", "ASC"]],
    });

    // Filter by availability if dates are provided
    if (checkInDate && checkOutDate) {
      const bookings = await RoomBooking.findAll({
        where: {
          status: {
            [Op.in]: ["confirmed", "checked_in"],
          },
          [Op.or]: [
            {
              checkInDate: {
                [Op.between]: [checkInDate, checkOutDate],
              },
            },
            {
              checkOutDate: {
                [Op.between]: [checkInDate, checkOutDate],
              },
            },
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

      const bookedRoomIds = new Set(bookings.map((booking) => booking.roomId));
      rooms = rooms.filter((room) => !bookedRoomIds.has(room.id));
    }

    res.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET a room by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Check room availability
router.post("/:id/availability", async (req, res) => {
  try {
    const { id } = req.params;
    const { checkInDate, checkOutDate } = req.body;

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "checkInDate and checkOutDate are required" });
    }

    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const conflictingBooking = await RoomBooking.findOne({
      where: {
        roomId: id,
        status: {
          [Op.in]: ["confirmed", "checked_in"],
        },
        [Op.or]: [
          {
            checkInDate: {
              [Op.between]: [checkInDate, checkOutDate],
            },
          },
          {
            checkOutDate: {
              [Op.between]: [checkInDate, checkOutDate],
            },
          },
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
    
    // Calculate number of nights
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = parseFloat(room.price) * nights;

    res.json({
      isAvailable,
      room,
      nights,
      totalPrice,
    });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST create a new booking
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

    // Validate required fields
    if (!guestName || !guestEmail || !guestPhone || !checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if room exists
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Check availability
    const conflictingBooking = await RoomBooking.findOne({
      where: {
        roomId: id,
        status: {
          [Op.in]: ["confirmed", "checked_in"],
        },
        [Op.or]: [
          {
            checkInDate: {
              [Op.between]: [checkInDate, checkOutDate],
            },
          },
          {
            checkOutDate: {
              [Op.between]: [checkInDate, checkOutDate],
            },
          },
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

    // Calculate total price
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    const totalPrice = parseFloat(room.price) * nights;

    // Validate number of guests
    if (numberOfGuests > room.maxGuests) {
      return res.status(400).json({
        message: `Maximum ${room.maxGuests} guests allowed for this room`,
      });
    }

    // Create booking
    const booking = await RoomBooking.create({
      roomId: parseInt(id),
      guestName,
      guestEmail,
      guestPhone,
      checkInDate,
      checkOutDate,
      numberOfGuests: numberOfGuests || 1,
      totalPrice,
      specialRequests: specialRequests || null,
      status: "pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET all bookings (for admin)
router.get("/bookings/all", async (req, res) => {
  try {
    const bookings = await RoomBooking.findAll({
      include: [
        {
          model: Room,
          as: "room",
          attributes: ["type", "branch", "price"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
