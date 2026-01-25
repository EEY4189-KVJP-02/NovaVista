import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Hotel = sequelize.define(
  "Hotel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
      defaultValue: 4.5,
    },

    price_per_night: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    // ✅ JSON array: ["img1", "img2", ...]
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: "hotels",
    timestamps: true, // createdAt, updatedAt
  }
);

export default Hotel;
