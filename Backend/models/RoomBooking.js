import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const RoomBooking = sequelize.define(
  "RoomBooking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // Keep as loose reference (no hard dependency on auth changes)
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guestName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guestEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guestPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    checkInDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled", "checked_in", "checked_out"),
      allowNull: false,
      defaultValue: "pending",
    },
    specialRequests: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "room_bookings",
    timestamps: true,
  }
);

export default RoomBooking;
