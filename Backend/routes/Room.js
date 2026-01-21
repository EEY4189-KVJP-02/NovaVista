import express from "express";
import Room from "../models/Room.js";
import RoomBooking from "../models/RoomBooking.js";
import User from "../models/User.js";
import { Op } from "sequelize";
import { authenticate } from "../middleware/auth.js";

// Associations are set up in server.js - no need to set them here again

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

    // Check for conflicting bookings including pending ones to prevent double bookings
    const conflictingBooking = await RoomBooking.findOne({
      where: {
        roomId: id,
        status: {
          [Op.in]: ["pending", "confirmed", "checked_in"],
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

// POST create a new booking (requires authentication)
router.post("/:id/book", authenticate, async (req, res) => {
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
      console.error(`Room with ID ${id} not found in database`);
      return res.status(404).json({ message: "Room not found" });
    }
    
    console.log(`Room found: ${room.type} at ${room.branch}, Price: ${room.price}`);

    // Check availability - include pending bookings to prevent double bookings
    const conflictingBooking = await RoomBooking.findOne({
      where: {
        roomId: id,
        status: {
          [Op.in]: ["pending", "confirmed", "checked_in"],
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

    // Create booking with userId from authenticated user
    console.log("Creating booking with data:", {
      userId: req.user.id,
      roomId: parseInt(id),
      guestName,
      guestEmail,
      checkInDate,
      checkOutDate,
      numberOfGuests: numberOfGuests || 1,
      totalPrice,
    });

    let booking;
    try {
      booking = await RoomBooking.create({
        userId: req.user.id,
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
    console.log("Booking created successfully with ID:", booking.id);
    console.log("Booking data:", JSON.stringify(booking.toJSON(), null, 2));
    } catch (createError) {
      console.error("Error during RoomBooking.create:", createError);
      console.error("Create error details:", {
        name: createError.name,
        message: createError.message,
        errors: createError.errors,
      });
      throw createError;
    }

    // Verify booking was saved by fetching it back
    const savedBooking = await RoomBooking.findByPk(booking.id);
    if (!savedBooking) {
      console.error("ERROR: Booking was created but not found in database!");
      return res.status(500).json({ 
        message: "Booking creation failed - could not verify save",
      });
    }
    
    console.log("Booking verified in database with ID:", savedBooking.id);

    // Fetch the created booking with relations to return complete data
    const bookingWithDetails = await RoomBooking.findByPk(booking.id, {
      include: [
        {
          model: Room,
          as: "room",
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"],
        },
      ],
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking: bookingWithDetails || booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    console.error("Error details:", {
      message: error.message,
      name: error.name,
      stack: error.stack,
    });
    res.status(500).json({ 
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET user's own bookings (requires authentication)
router.get("/bookings/my", authenticate, async (req, res) => {
  try {
    const bookings = await RoomBooking.findAll({
      where: {
        userId: req.user.id,
      },
      include: [
        {
          model: Room,
          as: "room",
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
