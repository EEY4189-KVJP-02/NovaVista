// Script to insert rooms into database
// Run with: node Backend/database/insert-rooms.js

import { sequelize } from '../config/db.js';
import Room from '../models/Room.js';

const insertRooms = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.\n');

    // Check if rooms already exist
    const existingRooms = await Room.findAll();
    if (existingRooms.length > 0) {
      console.log(`Found ${existingRooms.length} existing rooms in database.`);
      console.log('Skipping room insertion. Use --force to overwrite.\n');
      process.exit(0);
    }

    console.log('Inserting rooms into database...\n');

    const rooms = [
      // Jaffna Branch - IDs: 1, 2, 3
      {
        type: 'Standard Single Room',
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 5 rooms left at this price!',
        price: 5000.00,
        image: '/Images/jaffna-single-room.jpg',
        branch: 'Jaffna',
        maxGuests: 1,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'],
        isActive: true,
      },
      {
        type: 'Double Room',
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!',
        price: 10000.00,
        image: '/Images/jaffna-double-room.jpg',
        branch: 'Jaffna',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'],
        isActive: true,
      },
      {
        type: 'Deluxe Room',
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!',
        price: 25000.00,
        image: '/Images/jaffna-deluxe-room.jpg',
        branch: 'Jaffna',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Free Cancellation'],
        isActive: true,
      },
      // Kilinochchi Branch - IDs: 4, 5, 6
      {
        type: 'Standard Single Room',
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 4 rooms left at this price!',
        price: 5000.00,
        image: '/Images/kilinochchi-single-room.jpg',
        branch: 'Kilinochchi',
        maxGuests: 1,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'],
        isActive: true,
      },
      {
        type: 'Double Room',
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 2 rooms left at this special rate!',
        price: 10000.00,
        image: '/Images/kilinochchi-double-room.jpg',
        branch: 'Kilinochchi',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'],
        isActive: true,
      },
      {
        type: 'Deluxe Room',
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!',
        price: 25000.00,
        image: '/Images/kilinochchi-deluxe-room.jpg',
        branch: 'Kilinochchi',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Free Cancellation'],
        isActive: true,
      },
      // Mannar Branch - IDs: 7, 8, 9
      {
        type: 'Standard Single Room',
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 6 rooms left at this price!',
        price: 5000.00,
        image: '/Images/mannar-single-room.jpg',
        branch: 'Mannar',
        maxGuests: 1,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'],
        isActive: true,
      },
      {
        type: 'Double Room',
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 4 rooms left at this special rate!',
        price: 10000.00,
        image: '/Images/mannar-double-room.jpg',
        branch: 'Mannar',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'],
        isActive: true,
      },
      {
        type: 'Deluxe Room',
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!',
        price: 25000.00,
        image: '/Images/mannar-deluxe-room.jpg',
        branch: 'Mannar',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Free Cancellation'],
        isActive: true,
      },
    ];

    // Insert rooms one by one to ensure proper IDs
    for (let i = 0; i < rooms.length; i++) {
      const roomData = rooms[i];
      try {
        const room = await Room.create(roomData);
        console.log(`✓ Created room ID ${room.id}: ${room.type} (${room.branch})`);
      } catch (err) {
        console.error(`✗ Failed to create room ${i + 1}:`, err.message);
      }
    }

    console.log('\n✓ Room insertion completed!');
    
    // Verify rooms were created
    const allRooms = await Room.findAll();
    console.log(`\nTotal rooms in database: ${allRooms.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error inserting rooms:', error);
    process.exit(1);
  }
};

insertRooms();
