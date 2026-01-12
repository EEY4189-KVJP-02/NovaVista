import express from "express";
import EventHall from "../models/EventHall.js";

const router = express.Router();

// GET all halls
router.get("/", async (req, res) => {
  try {
    const halls = await EventHall.findAll();
    res.json(halls);
  } catch (error) {
    console.error("Error fetching halls:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET a hall by ID
router.get("/:id", async (req, res) => {
  try {
    const hall = await EventHall.findByPk(req.params.id);
    if (!hall) return res.status(404).json({ message: "Hall not found" });
    res.json(hall);
  } catch (error) {
    console.error("Error fetching hall:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
