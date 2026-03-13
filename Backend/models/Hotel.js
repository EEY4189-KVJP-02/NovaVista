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

    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
  },
  {
    tableName: "hotels",
    timestamps: true,
  }
);

export async function seedDefaultHotelsIfEmpty() {
  const existing = await Hotel.count();
  if (existing > 0) {
    return { seeded: false, count: existing };
  }

  const defaultHotels = [
    {
      id: 1,
      name: "Nova Vista – Jaffna",
      location: "Jaffna, Sri Lanka",
      description: "Comfortable stay in the heart of Jaffna.",
      rating: 4.7,
      price_per_night: 4500,
      images: ["/Images/Room_1.jpg", "/Images/Event_1.jpg", "/Images/jaffna.jpg"],
    },
    {
      id: 2,
      name: "Nova Vista – Kilinochchi",
      location: "Kilinochchi, Sri Lanka",
      description: "Modern facilities, great events hall.",
      rating: 4.6,
      price_per_night: 4200,
      images: ["/Images/Room_2.jpg", "/Images/Event_2.jpg", "/Images/kilinochchi.jpg"],
    },
    {
      id: 3,
      name: "Nova Vista – Mannar",
      location: "Mannar, Sri Lanka",
      description: "Seaside comfort with welcoming staff.",
      rating: 4.8,
      price_per_night: 4600,
      images: ["/Images/Room_3.jpg", "/Images/Event_3.jpg", "/Images/mannar.jpg"],
    },
  ];

  await Hotel.bulkCreate(defaultHotels, { validate: true });
  const count = await Hotel.count();
  return { seeded: true, count };
}

export default Hotel;
