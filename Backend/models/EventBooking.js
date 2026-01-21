import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const EventBooking = sequelize.define(
  "EventBooking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    hallId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "event_halls",
        key: "id",
      },
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    eventDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
    specialRequests: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "event_bookings",
    timestamps: true,
  }
);

export default EventBooking;
