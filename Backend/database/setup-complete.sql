-- Complete Database setup script for Hotel Management System
-- Run this script to create all necessary tables

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    phone VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create locations table (for reference, though we use ENUM in rooms/halls)
CREATE TABLE IF NOT EXISTS locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    address TEXT,
    phone VARCHAR(255),
    email VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

-- Create event_halls table
CREATE TABLE IF NOT EXISTS event_halls (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    seating VARCHAR(255),
    capacity INT,
    description TEXT,
    rating INT DEFAULT 5,
    image VARCHAR(500),
    price DECIMAL(10, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_location (location)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create room_bookings table (updated with userId)
CREATE TABLE IF NOT EXISTS room_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
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
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (roomId) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_roomId (roomId),
    INDEX idx_dates (checkInDate, checkOutDate),
    INDEX idx_status (status),
    INDEX idx_guestEmail (guestEmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create event_bookings table
CREATE TABLE IF NOT EXISTS event_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    hallId INT NOT NULL,
    eventName VARCHAR(255) NOT NULL,
    contactName VARCHAR(255) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contactPhone VARCHAR(255) NOT NULL,
    eventDate DATE NOT NULL,
    numberOfGuests INT NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    specialRequests TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (hallId) REFERENCES event_halls(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_hallId (hallId),
    INDEX idx_eventDate (eventDate),
    INDEX idx_status (status),
    INDEX idx_contactEmail (contactEmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create event_bookings table
CREATE TABLE IF NOT EXISTS event_test (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    hallId INT NOT NULL,
    eventName VARCHAR(255) NOT NULL,
    contactName VARCHAR(255) NOT NULL,
    contactEmail VARCHAR(255) NOT NULL,
    contactPhone VARCHAR(255) NOT NULL,
    eventDate DATE NOT NULL,
    numberOfGuests INT NOT NULL,
    totalPrice DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    specialRequests TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (hallId) REFERENCES event_halls(id) ON DELETE CASCADE,
    INDEX idx_userId (userId),
    INDEX idx_hallId (hallId),
    INDEX idx_eventDate (eventDate),
    INDEX idx_status (status),
    INDEX idx_contactEmail (contactEmail)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
-- Insert default admin user
-- Password: admin123 (hashed with bcrypt, rounds=10)
-- You should hash this password using bcrypt in your application
INSERT INTO users (username, email, password, role, firstName, lastName) VALUES
('admin', 'admin@gmail.com', '$2b$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', 'admin', 'Admin', 'User')
ON DUPLICATE KEY UPDATE email=email;

-- Insert locations
INSERT INTO locations (name, address, phone, email) VALUES
('Jaffna', '123 Main Street, Jaffna', '+94 21 222 5434', 'jaffna@novavistahotel.com'),
('Kilinochchi', '456 Central Road, Kilinochchi', '+94 21 222 5434', 'kilinochchi@novavistahotel.com'),
('Mannar', '789 Beach Road, Mannar', '+94 21 222 5434', 'mannar@novavistahotel.com')
ON DUPLICATE KEY UPDATE name=name;

-- Insert sample room data for all branches with unique IDs and location-specific images
-- Each room type at each location has a unique ID (1-9)
-- Jaffna Branch - IDs: 1, 2, 3
INSERT INTO rooms (type, description, price, image, branch, maxGuests, amenities, isActive) VALUES
('Standard Single Room', 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 5 rooms left at this price!', 5000.00, '/Images/jaffna-single-room.jpg', 'Jaffna', 1, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'), TRUE),
('Double Room', 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!', 10000.00, '/Images/jaffna-double-room.jpg', 'Jaffna', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'), TRUE),
('Deluxe Room', 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', 25000.00, '/Images/jaffna-deluxe-room.jpg', 'Jaffna', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Free Cancellation'), TRUE),

-- Kilinochchi Branch - IDs: 4, 5, 6
('Standard Single Room', 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 4 rooms left at this price!', 5000.00, '/Images/kilinochchi-single-room.jpg', 'Kilinochchi', 1, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'), TRUE),
('Double Room', 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 2 rooms left at this special rate!', 10000.00, '/Images/kilinochchi-double-room.jpg', 'Kilinochchi', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'), TRUE),
('Deluxe Room', 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', 25000.00, '/Images/kilinochchi-deluxe-room.jpg', 'Kilinochchi', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Free Cancellation'), TRUE),

-- Mannar Branch - IDs: 7, 8, 9
('Standard Single Room', 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 6 rooms left at this price!', 5000.00, '/Images/mannar-single-room.jpg', 'Mannar', 1, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'), TRUE),
('Double Room', 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 4 rooms left at this special rate!', 10000.00, '/Images/mannar-double-room.jpg', 'Mannar', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'), TRUE),
('Deluxe Room', 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', 25000.00, '/Images/mannar-deluxe-room.jpg', 'Mannar', 2, JSON_ARRAY('Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Free Cancellation'), TRUE)
ON DUPLICATE KEY UPDATE type=type;
