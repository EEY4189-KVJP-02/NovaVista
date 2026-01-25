import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const HotelBooking = sequelize.define(
  "HotelBooking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    hotel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    check_in: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    check_out: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    rooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    customer_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    customer_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "hotel_bookings", // ✅ must match phpMyAdmin table name
    timestamps: true,            // ✅ uses createdAt + updatedAt (your table has these)
  }
);

export default HotelBooking;
