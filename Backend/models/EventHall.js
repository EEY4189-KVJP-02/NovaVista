import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Hall = sequelize.define(
  "EventHall",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    seating: {
      type: DataTypes.STRING,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
      validate: {
        min: 1,
        max: 5
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
  },
  {
    tableName: "event_halls",
    timestamps: false,
  }
);

export default Hall;
