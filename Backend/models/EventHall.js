// EventHall.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EventHall = sequelize.define(
  "event_hall",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    seating: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    image: DataTypes.STRING,
  },
  { tableName: "event_halls", timestamps: false },
);

export default EventHall;
