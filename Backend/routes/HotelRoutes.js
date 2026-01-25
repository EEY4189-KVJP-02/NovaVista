import express from "express";
import Hotel from "../models/Hotel.js";

const router = express.Router();

/**
 * GET /api/hotels
 * Fetch all hotels from DB
 */
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.findAll({ order: [["id", "ASC"]] });
    res.json(hotels);
  } catch (err) {
    console.error("Fetch hotels error:", err);
    res.status(500).json({ message: "Failed to fetch hotels" });
  }
});

/**
 * POST /api/hotels
 * Insert a hotel into DB (optional)
 */
router.post("/", async (req, res) => {
  try {
    const { name, location, description, rating, price_per_night, images } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: "name and location are required" });
    }

    const hotel = await Hotel.create({
      name,
      location,
      description: description ?? "",
      rating: rating ?? 4.5,
      price_per_night: price_per_night ?? 0,
      images: Array.isArray(images) ? images : [],
    });

    res.status(201).json(hotel);
  } catch (err) {
    console.error("Create hotel error:", err);
    res.status(500).json({ message: "Failed to create hotel" });
  }
});

export default router;
