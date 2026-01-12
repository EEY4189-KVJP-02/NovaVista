-- Database setup script for Hotel Management System
-- Run this script to create the necessary tables for room booking functionality

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500),
    branch ENUM('Jaffna', 'Kilinochchi', 'Mannar') NOT NULL,
    maxGuests INT DEFAULT 2,
    amenities JSON DEFAULT (JSON_ARRAY()),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_branch (branch),
    INDEX idx_price (price),
    INDEX idx_active (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create room_bookings table
CREATE TABLE IF NOT EXISTS room_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roomId INT NOT NULL,
    guestName VARCHAR(255) NOT NULL,
    guestEmail VARCHAR(255) NOT NULL,
    guestPhone VARCHAR(255) NOT NULL,
    checkInDate DATE NOT NULL,
    checkOutDate DATE NOT NULL,
    numberOfGuests INT NOT NULL DEFAULT 1,
    totalPrice DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'checked_in', 'checked_out') DEFAULT 'pending',
    specialRequests TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_roomId (roomId),
    INDEX idx_dates (checkInDate, checkOutDate),
    INDEX idx_status (status),
    INDEX idx_guestEmail (guestEmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample room data
INSERT INTO rooms (type, description, price, image, branch, maxGuests, amenities, isActive) VALUES
('Standard Single Room', 'Comfortable single room with essential amenities. Free cancellation, no prepayment needed. Limited availability - only 5 rooms left at this rate!', 5000.00, '/single room.png', 'Jaffna', 1, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning'), TRUE),
('Double Room', 'Spacious double room perfect for couples. Free cancellation, no prepayment needed. Book with confidence!', 10000.00, '/double room.jpg', 'Jaffna', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'), TRUE),
('Deluxe Room', 'Luxurious deluxe room with premium amenities. Free cancellation, easy booking, stress-free payment. Exclusive price!', 25000.00, '/deluxe room.jpg', 'Jaffna', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony'), TRUE),
('Standard Single Room', 'Comfortable single room with essential amenities. Free cancellation, no prepayment needed.', 5000.00, '/single room.png', 'Kilinochchi', 1, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning'), TRUE),
('Double Room', 'Spacious double room perfect for couples. Free cancellation, no prepayment needed.', 10000.00, '/double room.jpg', 'Kilinochchi', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'), TRUE),
('Deluxe Room', 'Luxurious deluxe room with premium amenities. Free cancellation, exclusive price!', 25000.00, '/deluxe room.jpg', 'Kilinochchi', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service'), TRUE),
('Standard Single Room', 'Comfortable single room with essential amenities. Free cancellation, no prepayment needed.', 5000.00, '/single room.png', 'Mannar', 1, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning'), TRUE),
('Double Room', 'Spacious double room perfect for couples. Free cancellation, no prepayment needed.', 10000.00, '/double room.jpg', 'Mannar', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar'), TRUE),
('Deluxe Room', 'Luxurious deluxe room with premium amenities. Free cancellation, exclusive price!', 25000.00, '/deluxe room.jpg', 'Mannar', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony'), TRUE);
