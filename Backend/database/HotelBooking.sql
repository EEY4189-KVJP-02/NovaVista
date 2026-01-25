-- Use your existing database
USE nova_vistaDB;

-- Drop table if it already exists (optional, for reset)
DROP TABLE IF EXISTS hotel_bookings;

-- Hotel bookings table
CREATE TABLE hotel_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,

    hotel_id INT NOT NULL,
    
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,

    rooms INT NOT NULL CHECK (rooms > 0),

    customer_name VARCHAR(120),
    customer_email VARCHAR(120),

    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
              ON UPDATE CURRENT_TIMESTAMP
);

-- Indexes for faster availability checks
CREATE INDEX idx_hotel_id ON hotel_bookings (hotel_id);
CREATE INDEX idx_dates ON hotel_bookings (check_in, check_out);

