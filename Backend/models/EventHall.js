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

export async function seedDefaultEventHallsIfEmpty() {
  const existing = await Hall.count();
  if (existing > 0) {
    return { seeded: false, count: existing };
  }

  // Mirrors Backend/database/event_hall.sql (24 halls)
  const halls = [
    // Jaffna
    { name: "Jaffna Hall 1", location: "Jaffna", seating: "Boardroom", capacity: 50, description: "Boardroom hall suitable for meetings.", rating: 4, image: "hall1.jpg" },
    { name: "Jaffna Hall 2", location: "Jaffna", seating: "Boardroom", capacity: 80, description: "Corporate boardroom with projector.", rating: 5, image: "hall2.jpg" },
    { name: "Jaffna Hall 3", location: "Jaffna", seating: "Circular", capacity: 120, description: "Circular seating for workshops.", rating: 4, image: "hall3.jpg" },
    { name: "Jaffna Hall 4", location: "Jaffna", seating: "Circular", capacity: 180, description: "Open circular hall with lighting.", rating: 5, image: "hall4.jpg" },
    { name: "Jaffna Hall 5", location: "Jaffna", seating: "Theater", capacity: 220, description: "Theater style seminar hall.", rating: 5, image: "hall5.jpg" },
    { name: "Jaffna Hall 6", location: "Jaffna", seating: "Theater", capacity: 300, description: "Large theater hall with stage.", rating: 4, image: "hall6.jpg" },
    { name: "Jaffna Hall 7", location: "Jaffna", seating: "U-Shaped", capacity: 90, description: "U-shaped seating for discussions.", rating: 4, image: "hall7.jpg" },
    { name: "Jaffna Hall 8", location: "Jaffna", seating: "U-Shaped", capacity: 150, description: "Interactive U-shaped hall.", rating: 5, image: "hall8.jpg" },

    // Kilinochchi
    { name: "Kilinochchi Hall 1", location: "Kilinochchi", seating: "Boardroom", capacity: 40, description: "Compact boardroom setup.", rating: 3, image: "hall9.jpg" },
    { name: "Kilinochchi Hall 2", location: "Kilinochchi", seating: "Boardroom", capacity: 70, description: "Business meeting hall.", rating: 4, image: "hall10.jpg" },
    { name: "Kilinochchi Hall 3", location: "Kilinochchi", seating: "Circular", capacity: 130, description: "Circular training hall.", rating: 4, image: "hall11.jpg" },
    { name: "Kilinochchi Hall 4", location: "Kilinochchi", seating: "Circular", capacity: 190, description: "Workshop hall with open space.", rating: 5, image: "hall12.jpg" },
    { name: "Kilinochchi Hall 5", location: "Kilinochchi", seating: "Theater", capacity: 250, description: "Conference theater hall.", rating: 5, image: "hall13.jpg" },
    { name: "Kilinochchi Hall 6", location: "Kilinochchi", seating: "Theater", capacity: 350, description: "Large conference auditorium.", rating: 4, image: "hall14.jpg" },
    { name: "Kilinochchi Hall 7", location: "Kilinochchi", seating: "U-Shaped", capacity: 100, description: "U-shaped seating for teams.", rating: 4, image: "hall15.jpg" },
    { name: "Kilinochchi Hall 8", location: "Kilinochchi", seating: "U-Shaped", capacity: 170, description: "Discussion-based hall.", rating: 5, image: "hall16.jpg" },

    // Mannar
    { name: "Mannar Hall 1", location: "Mannar", seating: "Boardroom", capacity: 60, description: "Quiet boardroom for meetings.", rating: 4, image: "hall17.jpg" },
    { name: "Mannar Hall 2", location: "Mannar", seating: "Boardroom", capacity: 90, description: "Strategy meeting hall.", rating: 5, image: "hall18.jpg" },
    { name: "Mannar Hall 3", location: "Mannar", seating: "Circular", capacity: 140, description: "Circular seminar hall.", rating: 4, image: "hall19.jpg" },
    { name: "Mannar Hall 4", location: "Mannar", seating: "Circular", capacity: 200, description: "Large circular hall.", rating: 5, image: "hall20.jpg" },
    { name: "Mannar Hall 5", location: "Mannar", seating: "Theater", capacity: 280, description: "Stage-equipped theater hall.", rating: 5, image: "hall21.jpg" },
    { name: "Mannar Hall 6", location: "Mannar", seating: "Theater", capacity: 400, description: "Event theater for large audiences.", rating: 4, image: "hall22.jpg" },
    { name: "Mannar Hall 7", location: "Mannar", seating: "U-Shaped", capacity: 110, description: "U-shaped collaborative hall.", rating: 4, image: "hall23.jpg" },
    { name: "Mannar Hall 8", location: "Mannar", seating: "U-Shaped", capacity: 180, description: "Training and discussion hall.", rating: 5, image: "hall24.jpg" },
  ];

  await Hall.bulkCreate(halls, { validate: true });
  const count = await Hall.count();
  return { seeded: true, count };
}

export default Hall;
