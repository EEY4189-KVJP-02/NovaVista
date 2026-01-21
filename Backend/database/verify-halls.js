// Script to verify event halls exist in database
// Run with: node Backend/database/verify-halls.js

import { sequelize } from '../config/db.js';
import EventHall from '../models/EventHall.js';

const verifyHalls = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.\n');

    // Check for halls
    const halls = await EventHall.findAll();
    console.log(`Total event halls in database: ${halls.length}\n`);

    if (halls.length === 0) {
      console.log('⚠️  No event halls found in database!');
      console.log('You need to insert event halls into the database.\n');
    } else {
      console.log('Event halls in database:');
      halls.forEach(hall => {
        console.log(`  ID: ${hall.id} - ${hall.name} (${hall.location}) - Capacity: ${hall.capacity} - Price: ${hall.price || 'N/A'}`);
      });
    }

    process.exit(0);
  } catch (error) {
    console.error('Error verifying halls:', error);
    process.exit(1);
  }
};

verifyHalls();
