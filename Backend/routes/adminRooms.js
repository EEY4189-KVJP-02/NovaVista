import express from "express";
import jwt from "jsonwebtoken";
import Room, { seedDefaultRoomsIfEmpty } from "../models/Room.js";
import RoomBooking from "../models/RoomBooking.js";

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "novavista_secret";

const requireAdmin = (req, res, next) => {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const token = auth.slice("Bearer ".length);
    const payload = jwt.verify(token, JWT_SECRET);
    if (!payload || payload.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = payload;
    return next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

// All room-admin routes require admin auth
router.use(requireAdmin);

// ---------------------------
// Rooms (inventory) admin
// ---------------------------

// GET /api/admin/rooms
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.findAll({ order: [["id", "ASC"]] });
    res.json(rooms);
  } catch (error) {
    console.error("Admin rooms fetch error:", error);
    res.status(500).json({ message: "Failed to fetch rooms" });
  }
});

// POST /api/admin/rooms/seed
router.post("/rooms/seed", async (req, res) => {
  try {
    const result = await seedDefaultRoomsIfEmpty();
    res.json(result);
  } catch (error) {
    console.error("Admin rooms seed error:", error);
    res.status(500).json({ message: "Failed to seed rooms" });
  }
});

// POST /api/admin/rooms
router.post("/rooms", async (req, res) => {
  try {
    const { type, description, price, image, branch, maxGuests, amenities, isActive } = req.body;

    if (!type || !branch) {
      return res.status(400).json({ message: "type and branch are required" });
    }

    const room = await Room.create({
      type,
      description: description ?? "",
      price: price ?? 0,
      image: image ?? null,
      branch,
      maxGuests: maxGuests ?? 2,
      amenities: Array.isArray(amenities) ? amenities : [],
      isActive: isActive ?? true,
    });

    res.status(201).json(room);
  } catch (error) {
    console.error("Admin rooms create error:", error);
    res.status(500).json({ message: "Failed to create room" });
  }
});

// PUT /api/admin/rooms/:id
router.put("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const { type, description, price, image, branch, maxGuests, amenities, isActive } = req.body;

    await room.update({
      type: type ?? room.type,
      description: description ?? room.description,
      price: price ?? room.price,
      image: image ?? room.image,
      branch: branch ?? room.branch,
      maxGuests: maxGuests ?? room.maxGuests,
      amenities: Array.isArray(amenities) ? amenities : room.amenities,
      isActive: isActive ?? room.isActive,
    });

    res.json(room);
  } catch (error) {
    console.error("Admin rooms update error:", error);
    res.status(500).json({ message: "Failed to update room" });
  }
});

// DELETE /api/admin/rooms/:id (soft-delete by deactivating)
router.delete("/rooms/:id", async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });

    await room.update({ isActive: false });
    res.json({ message: "Room deactivated" });
  } catch (error) {
    console.error("Admin rooms delete error:", error);
    res.status(500).json({ message: "Failed to deactivate room" });
  }
});

// ---------------------------
// Room bookings admin
// ---------------------------

// GET /api/admin/room-bookings
router.get("/room-bookings", async (req, res) => {
  try {
    const bookings = await RoomBooking.findAll({
      include: [{ model: Room, as: "room" }],
      order: [["createdAt", "DESC"]],
    });
    res.json(bookings);
  } catch (error) {
    console.error("Admin room-bookings fetch error:", error);
    res.status(500).json({ message: "Failed to fetch room bookings" });
  }
});

// PUT /api/admin/room-bookings/:id
router.put("/room-bookings/:id", async (req, res) => {
  try {
    const booking = await RoomBooking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "status is required" });

    await booking.update({ status });
    const updated = await RoomBooking.findByPk(req.params.id, { include: [{ model: Room, as: "room" }] });
    res.json({ message: "Booking updated", booking: updated || booking });
  } catch (error) {
    console.error("Admin room-bookings update error:", error);
    res.status(500).json({ message: "Failed to update booking" });
  }
});

// DELETE /api/admin/room-bookings/:id
router.delete("/room-bookings/:id", async (req, res) => {
  try {
    const booking = await RoomBooking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    await booking.destroy();
    res.json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Admin room-bookings delete error:", error);
    res.status(500).json({ message: "Failed to delete booking" });
  }
});

export default router;
