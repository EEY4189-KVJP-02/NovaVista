import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Room = sequelize.define(
  "Room",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    branch: {
      type: DataTypes.ENUM("Jaffna", "Kilinochchi", "Mannar"),
      allowNull: false,
    },
    maxGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
    amenities: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "rooms",
    timestamps: true,
  }
);

export async function seedDefaultRoomsIfEmpty() {
  const existing = await Room.count();
  if (existing > 0) {
    return { seeded: false, count: existing };
  }

  const defaultRooms = [
    // Jaffna: 1-3
    {
      id: 1,
      type: "Standard Single Room",
      description:
        "Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 5 rooms left at this price!",
      price: 5000,
      image: "/Images/single room.png",
      branch: "Jaffna",
      maxGuests: 1,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Free Cancellation"],
      isActive: true,
    },
    {
      id: 2,
      type: "Double Room",
      description:
        "Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!",
      price: 10000,
      image: "/Images/double room.jpg",
      branch: "Jaffna",
      maxGuests: 2,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Free Cancellation"],
      isActive: true,
    },
    {
      id: 3,
      type: "Deluxe Room",
      description:
        "Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!",
      price: 25000,
      image: "/Images/deluxe room.jpg",
      branch: "Jaffna",
      maxGuests: 2,
      amenities: [
        "Wi-Fi",
        "TV",
        "Air Conditioning",
        "Mini Bar",
        "Room Service",
        "Balcony",
        "Free Cancellation",
      ],
      isActive: true,
    },

    // Kilinochchi: 4-6
    {
      id: 4,
      type: "Standard Single Room",
      description:
        "Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 4 rooms left at this price!",
      price: 5000,
      image: "/Images/single room.png",
      branch: "Kilinochchi",
      maxGuests: 1,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Free Cancellation"],
      isActive: true,
    },
    {
      id: 5,
      type: "Double Room",
      description:
        "Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 2 rooms left at this special rate!",
      price: 10000,
      image: "/Images/double room.jpg",
      branch: "Kilinochchi",
      maxGuests: 2,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Free Cancellation"],
      isActive: true,
    },
    {
      id: 6,
      type: "Deluxe Room",
      description:
        "Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!",
      price: 25000,
      image: "/Images/deluxe room.jpg",
      branch: "Kilinochchi",
      maxGuests: 2,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Room Service", "Free Cancellation"],
      isActive: true,
    },

    // Mannar: 7-9
    {
      id: 7,
      type: "Standard Single Room",
      description:
        "Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 6 rooms left at this price!",
      price: 5000,
      image: "/Images/single room.png",
      branch: "Mannar",
      maxGuests: 1,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Free Cancellation"],
      isActive: true,
    },
    {
      id: 8,
      type: "Double Room",
      description:
        "Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!",
      price: 10000,
      image: "/Images/double room.jpg",
      branch: "Mannar",
      maxGuests: 2,
      amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Free Cancellation"],
      isActive: true,
    },
    {
      id: 9,
      type: "Deluxe Room",
      description:
        "Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!",
      price: 25000,
      image: "/Images/deluxe room.jpg",
      branch: "Mannar",
      maxGuests: 2,
      amenities: [
        "Wi-Fi",
        "TV",
        "Air Conditioning",
        "Mini Bar",
        "Room Service",
        "Balcony",
        "Free Cancellation",
      ],
      isActive: true,
    },
  ];

  await Room.bulkCreate(defaultRooms, { validate: true });
  const count = await Room.count();
  return { seeded: true, count };
}

export default Room;
