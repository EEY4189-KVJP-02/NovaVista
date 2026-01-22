import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EventBooking = sequelize.define(
  "EventBooking",
  {
    eventDate: { type: DataTypes.DATEONLY, allowNull: false },
    eventType: { type: DataTypes.STRING, allowNull: false },
    timeSlot: { type: DataTypes.STRING, allowNull: false },
    budget: { type: DataTypes.STRING, allowNull: false },
    decoration: { type: DataTypes.STRING, allowNull: false },
    catering: { type: DataTypes.STRING, allowNull: false },
    terms: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  { tableName: "event_bookings", timestamps: true }
);


export default EventBooking;
