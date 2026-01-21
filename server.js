const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database connection
// Note: In a production environment, use environment variables (process.env) for credentials
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',      // Default XAMPP/MySQL user
    password: '',      // Default XAMPP/MySQL password
    database: 'novavista_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        console.log('Please make sure your MySQL server is running and the database "novavista_db" is created.');
        return;
    }
    console.log('Connected to MySQL database.');
});

// API Routes

// Get all hotels
app.get('/api/hotels', (req, res) => {
    const query = 'SELECT * FROM hotels';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Transform data to match frontend expectations
        // The frontend expects specific image keys that might not be in the DB yet
        const hotels = results.map(hotel => ({
            id: hotel.hotel_id,
            name: hotel.hotel_name,
            location: hotel.location,
            description: hotel.description,
            rating: hotel.rating,
            images: {
                // Using the image from DB for front, others are placeholders for now
                img1: "/Images/Room_1.jpg",
                img2: "/Images/Event_1.jpg",
                front: hotel.image_url || "/Images/jaffna.jpg"
            }
        }));

        res.json(hotels);
    });
});

// Check availability
app.get('/api/availability', (req, res) => {
    const { hotelId, checkIn, checkOut, rooms } = req.query;

    if (!hotelId || !checkIn || !checkOut || !rooms) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    // Logic: Check if there are enough unbooked rooms for the hotel in the requested range

    // 1. Get total active rooms for this hotel
    const countQuery = 'SELECT COUNT(*) as total FROM rooms WHERE hotel_id = ? AND status = "Active"';

    db.query(countQuery, [hotelId], (err, countRes) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        const totalRooms = countRes[0].total;

        // 2. Count rooms that are occupied during the requested period
        // Overlap condition: (StartA < EndB) and (EndA > StartB)
        const bookedQuery = `
        SELECT COUNT(DISTINCT room_id) as booked 
        FROM reservations 
        WHERE hotel_id = ? 
        AND (
            (check_in < ? AND check_out > ?) 
        )
      `;

        // checkIn and checkOut from query are strings 'YYYY-MM-DD'
        db.query(bookedQuery, [hotelId, checkOut, checkIn], (err, bookedRes) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            const bookedRooms = bookedRes[0].booked;
            const availableRooms = totalRooms - bookedRooms;
            const requestedRooms = parseInt(rooms) || 0;

            if (availableRooms >= requestedRooms) {
                res.json({
                    available: true,
                    message: `Success! ${availableRooms} rooms available.`
                });
            } else {
                res.json({
                    available: false,
                    message: `Sorry, only ${availableRooms} rooms available for these dates.`
                });
            }
        });
    });
});

// Get available rooms details
app.get('/api/available-rooms', (req, res) => {
    const { hotelId, checkIn, checkOut } = req.query;

    if (!hotelId || !checkIn || !checkOut) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    const query = `
      SELECT * FROM rooms 
      WHERE hotel_id = ? 
      AND status = 'Active'
      AND room_id NOT IN (
        SELECT room_id FROM reservations 
        WHERE hotel_id = ?
        AND (
            (check_in < ? AND check_out > ?)
        )
      )
    `;

    db.query(query, [hotelId, hotelId, checkOut, checkIn], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// Book an event
app.post('/api/book', (req, res) => {
    const { eventDate, guests, hall, terms } = req.body;
    console.log('New Event Booking:', { eventDate, guests, hall, terms });
    // TODO: Insert into database table 'event_bookings'
    res.json({ message: "Event booked successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
