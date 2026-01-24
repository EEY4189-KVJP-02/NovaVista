import express from "express";
import EventHall from "../models/EventHall.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const halls = await EventHall.findAll();
    res.json(halls);
  } catch (err) {
    console.error("Error fetching halls:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const hall = await EventHall.findByPk(req.params.id);
    if (!hall) return res.status(404).json({ message: "Hall not found" });
    res.json(hall);
  } catch (err) {
    console.error("Error fetching hall:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;