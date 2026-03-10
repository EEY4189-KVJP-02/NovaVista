import express from "express";
import EventHall from "../models/EventHall.js";
import HallAvailability from "../models/HallAvailability.js";
import { Op } from "sequelize";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { location, seating, minCapacity, maxCapacity, eventDate, timeSlot } =
      req.query;

    const halls = await EventHall.findAll({
      where: {
        ...(location && { location }),
        ...(seating && { seating }),
        ...((minCapacity || maxCapacity) && {
          capacity: {
            ...(minCapacity && { [Op.gte]: Number(minCapacity) }),
            ...(maxCapacity && { [Op.lte]: Number(maxCapacity) }),
          },
        }),
      },
      include: [
        {
          model: HallAvailability,
          as: "hall_availabilities",
          required: false,
          where: {
            ...(eventDate && { booking_date: eventDate }),
            ...(timeSlot && { time_slot: timeSlot }),
          },
        },
      ],
    });

    res.json(halls);
  } catch (err) {
    console.error("Error fetching halls:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
