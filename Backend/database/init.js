// Database initialization script
// This script will sync Sequelize models with the database
// Run with: node Backend/database/init.js

import { sequelize } from '../config/db.js';
import User from '../models/User.js';
import Room from '../models/Room.js';
import RoomBooking from '../models/RoomBooking.js';
import EventHall from '../models/EventHall.js';
import EventBooking from '../models/EventBooking.js';
import Location from '../models/Location.js';
import bcrypt from 'bcrypt';

// Set up associations
User.hasMany(RoomBooking, { foreignKey: 'userId', as: 'roomBookings' });
RoomBooking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(EventBooking, { foreignKey: 'userId', as: 'eventBookings' });
EventBooking.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Room.hasMany(RoomBooking, { foreignKey: 'roomId', as: 'bookings' });
RoomBooking.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

EventHall.hasMany(EventBooking, { foreignKey: 'hallId', as: 'bookings' });
EventBooking.belongsTo(EventHall, { foreignKey: 'hallId', as: 'hall' });

const initializeDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    console.log('Synchronizing models with database...');
    // force: false - will not drop existing tables
    // alter: true - will alter tables to match models
    await sequelize.sync({ alter: true });
    console.log('Models synchronized successfully.');

    // Insert rooms if they don't exist
    const existingRooms = await Room.findAll();
    if (existingRooms.length === 0) {
      console.log('No rooms found, inserting default rooms...');
      const rooms = [
        { type: 'Standard Single Room', description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 5 rooms left at this price!', price: 5000.00, image: '/Images/jaffna-single-room.jpg', branch: 'Jaffna', maxGuests: 1, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'], isActive: true },
        { type: 'Double Room', description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!', price: 10000.00, image: '/Images/jaffna-double-room.jpg', branch: 'Jaffna', maxGuests: 2, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'], isActive: true },
        { type: 'Deluxe Room', description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', price: 25000.00, image: '/Images/jaffna-deluxe-room.jpg', branch: 'Jaffna', maxGuests: 2, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Free Cancellation'], isActive: true },
        { type: 'Standard Single Room', description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 4 rooms left at this price!', price: 5000.00, image: '/Images/kilinochchi-single-room.jpg', branch: 'Kilinochchi', maxGuests: 1, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'], isActive: true },
        { type: 'Double Room', description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 2 rooms left at this special rate!', price: 10000.00, image: '/Images/kilinochchi-double-room.jpg', branch: 'Kilinochchi', maxGuests: 2, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'], isActive: true },
        { type: 'Deluxe Room', description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', price: 25000.00, image: '/Images/kilinochchi-deluxe-room.jpg', branch: 'Kilinochchi', maxGuests: 2, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Free Cancellation'], isActive: true },
        { type: 'Standard Single Room', description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 6 rooms left at this price!', price: 5000.00, image: '/Images/mannar-single-room.jpg', branch: 'Mannar', maxGuests: 1, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'], isActive: true },
        { type: 'Double Room', description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 4 rooms left at this special rate!', price: 10000.00, image: '/Images/mannar-double-room.jpg', branch: 'Mannar', maxGuests: 2, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'], isActive: true },
        { type: 'Deluxe Room', description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', price: 25000.00, image: '/Images/mannar-deluxe-room.jpg', branch: 'Mannar', maxGuests: 2, amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Free Cancellation'], isActive: true },
      ];
      for (const roomData of rooms) {
        await Room.create(roomData);
      }
      console.log('✓ Default rooms inserted (9 rooms total)');
    } else {
      console.log(`✓ Found ${existingRooms.length} existing rooms in database`);
    }

    // Create default admin user if it doesn't exist
    const adminEmail = 'admin@gmail.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });
    
    if (!existingAdmin) {
      // Create user with plain password - the model hook will hash it
      await User.create({
        username: 'admin',
        email: adminEmail,
        password: 'admin123', // Plain password - will be hashed by beforeCreate hook
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
      });
      console.log('Default admin user created: admin@gmail.com / admin123');
    } else {
      // If admin exists but password might be wrong, reset it
      const testPassword = await existingAdmin.comparePassword('admin123');
      if (!testPassword) {
        // Password doesn't match, update it
        existingAdmin.password = 'admin123'; // Will be hashed by beforeUpdate hook
        await existingAdmin.save();
        console.log('Admin password reset to: admin123');
      } else {
        console.log('Admin user already exists with correct password.');
      }
    }

    console.log('Database initialization completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();
