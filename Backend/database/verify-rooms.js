// Script to verify rooms exist in database
// Run with: node Backend/database/verify-rooms.js

import { sequelize } from '../config/db.js';
import Room from '../models/Room.js';

const verifyRooms = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.\n');

    // Check for rooms
    const rooms = await Room.findAll();
    console.log(`Total rooms in database: ${rooms.length}\n`);

    if (rooms.length === 0) {
      console.log('⚠️  No rooms found in database!');
      console.log('You need to run the database setup script or insert rooms manually.\n');
      console.log('Expected room IDs: 1-9 (3 rooms per location: Jaffna, Kilinochchi, Mannar)');
    } else {
      console.log('Rooms in database:');
      rooms.forEach(room => {
        console.log(`  ID: ${room.id} - ${room.type} (${room.branch}) - Price: ${room.price}`);
      });
      
      // Check if we have the expected rooms (IDs 1-9)
      const expectedIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      const existingIds = rooms.map(r => r.id);
      const missingIds = expectedIds.filter(id => !existingIds.includes(id));
      
      if (missingIds.length > 0) {
        console.log(`\n⚠️  Missing room IDs: ${missingIds.join(', ')}`);
        console.log('These rooms need to be created for bookings to work properly.');
      } else {
        console.log('\n✓ All expected room IDs (1-9) are present in database');
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error verifying rooms:', error);
    process.exit(1);
  }
};

verifyRooms();
