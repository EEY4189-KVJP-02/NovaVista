// HallAvailability.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HallAvailability = sequelize.define(
  "hall_availability",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hall_id: DataTypes.INTEGER,
    booking_date: DataTypes.DATEONLY,
    time_slot: DataTypes.ENUM("Morning", "Evening", "Full Day"),
  },
  { tableName: "hall_availability", timestamps: false },
);

export default HallAvailability;
