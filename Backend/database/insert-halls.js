// Script to insert event halls into database
// Run with: node Backend/database/insert-halls.js

import { sequelize } from '../config/db.js';
import EventHall from '../models/EventHall.js';

const insertHalls = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.\n');

    // Check if halls already exist
    const existingHalls = await EventHall.findAll();
    if (existingHalls.length > 0) {
      console.log(`Found ${existingHalls.length} existing halls in database.`);
      console.log('Skipping hall insertion. Use --force to overwrite.\n');
      process.exit(0);
    }

    console.log('Inserting event halls into database...\n');

    const halls = [
      // Jaffna Branch - IDs: 1-5
      {
        name: 'Boardroom',
        location: 'Jaffna',
        seating: 'Boardroom',
        capacity: 20,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nPerfect for corporate meetings and small gatherings',
        rating: 5,
        image: '/Images/boardroom-jaffna.jpg',
        price: 5000.00,
      },
      {
        name: 'Hall',
        location: 'Jaffna',
        seating: 'Hall',
        capacity: 200,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nIdeal for large events and celebrations',
        rating: 5,
        image: '/Images/grand-hall-jaffna.jpg',
        price: 25000.00,
      },
      {
        name: 'Theater',
        location: 'Jaffna',
        seating: 'Theater',
        capacity: 150,
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nPerfect for presentations and conferences',
        rating: 5,
        image: '/Images/theater-jaffna.jpg',
        price: 15000.00,
      },
      {
        name: 'U-shaped',
        location: 'Jaffna',
        seating: 'U-shaped',
        capacity: 30,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nIdeal for interactive meetings and workshops',
        rating: 5,
        image: '/Images/ushaped-jaffna.jpg',
        price: 8000.00,
      },
      {
        name: 'Circular',
        location: 'Jaffna',
        seating: 'Circular',
        capacity: 25,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nPerfect for roundtable discussions',
        rating: 5,
        image: '/Images/circular-jaffna.jpg',
        price: 7000.00,
      },
      // Kilinochchi Branch - IDs: 6-10
      {
        name: 'Boardroom',
        location: 'Kilinochchi',
        seating: 'Boardroom',
        capacity: 20,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nPerfect for corporate meetings and small gatherings',
        rating: 5,
        image: '/Images/boardroom-kilinochchi.jpg',
        price: 5000.00,
      },
      {
        name: 'Hall',
        location: 'Kilinochchi',
        seating: 'Hall',
        capacity: 200,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nIdeal for large events and celebrations',
        rating: 5,
        image: '/Images/grand-hall-kilinochchi.jpg',
        price: 25000.00,
      },
      {
        name: 'Theater',
        location: 'Kilinochchi',
        seating: 'Theater',
        capacity: 150,
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nPerfect for presentations and conferences',
        rating: 5,
        image: '/Images/theater-kilinochchi.jpg',
        price: 15000.00,
      },
      {
        name: 'U-shaped',
        location: 'Kilinochchi',
        seating: 'U-shaped',
        capacity: 30,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nIdeal for interactive meetings and workshops',
        rating: 5,
        image: '/Images/ushaped-kilinochchi.jpg',
        price: 8000.00,
      },
      {
        name: 'Circular',
        location: 'Kilinochchi',
        seating: 'Circular',
        capacity: 25,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nPerfect for roundtable discussions',
        rating: 5,
        image: '/Images/circular-kilinochchi.jpg',
        price: 7000.00,
      },
      // Mannar Branch - IDs: 11-15
      {
        name: 'Boardroom',
        location: 'Mannar',
        seating: 'Boardroom',
        capacity: 20,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nPerfect for corporate meetings and small gatherings',
        rating: 5,
        image: '/Images/boardroom-mannar.jpg',
        price: 5000.00,
      },
      {
        name: 'Hall',
        location: 'Mannar',
        seating: 'Hall',
        capacity: 200,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nIdeal for large events and celebrations',
        rating: 5,
        image: '/Images/grand-hall-mannar.jpg',
        price: 25000.00,
      },
      {
        name: 'Theater',
        location: 'Mannar',
        seating: 'Theater',
        capacity: 150,
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nPerfect for presentations and conferences',
        rating: 5,
        image: '/Images/theater-mannar.jpg',
        price: 15000.00,
      },
      {
        name: 'U-shaped',
        location: 'Mannar',
        seating: 'U-shaped',
        capacity: 30,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nIdeal for interactive meetings and workshops',
        rating: 5,
        image: '/Images/ushaped-mannar.jpg',
        price: 8000.00,
      },
      {
        name: 'Circular',
        location: 'Mannar',
        seating: 'Circular',
        capacity: 25,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nPerfect for roundtable discussions',
        rating: 5,
        image: '/Images/circular-mannar.jpg',
        price: 7000.00,
      },
    ];

    // Insert halls one by one to ensure proper IDs
    for (let i = 0; i < halls.length; i++) {
      const hallData = halls[i];
      try {
        const hall = await EventHall.create(hallData);
        console.log(`✓ Created hall ID ${hall.id}: ${hall.name} (${hall.location})`);
      } catch (err) {
        console.error(`✗ Failed to create hall ${i + 1}:`, err.message);
      }
    }

    console.log('\n✓ Hall insertion completed!');
    
    // Verify halls were created
    const allHalls = await EventHall.findAll();
    console.log(`\nTotal halls in database: ${allHalls.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error inserting halls:', error);
    process.exit(1);
  }
};

insertHalls();
