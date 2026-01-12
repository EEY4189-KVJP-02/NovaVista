// Database initialization script
// This script will sync Sequelize models with the database
// Run with: node Backend/database/init.js

import { sequelize } from '../config/db.js';
import Room from '../models/Room.js';
import RoomBooking from '../models/RoomBooking.js';

// Set up associations
Room.hasMany(RoomBooking, { foreignKey: 'roomId', as: 'bookings' });
RoomBooking.belongsTo(Room, { foreignKey: 'roomId', as: 'room' });

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

    console.log('Database initialization completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();
