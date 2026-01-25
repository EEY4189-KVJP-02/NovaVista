USE nova_vistaDB;

-- ---------------------------------------------
-- Rooms inventory table (used by /api/rooms)
-- Matches Backend/models/Room.js
-- ---------------------------------------------

CREATE TABLE IF NOT EXISTS rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255) NOT NULL,
  description TEXT NULL,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  image VARCHAR(255) NULL,
  branch ENUM('Jaffna', 'Kilinochchi', 'Mannar') NOT NULL,
  maxGuests INT NOT NULL DEFAULT 2,
  amenities JSON NOT NULL,
  isActive BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_rooms_branch ON rooms (branch);
CREATE INDEX idx_rooms_active ON rooms (isActive);

-- Optional seed (only run once if your table is empty)
-- (Sequelize also auto-seeds via seedDefaultRoomsIfEmpty() in Backend/server.js)
-- INSERT INTO rooms (id, type, description, price, image, branch, maxGuests, amenities, isActive) VALUES
-- (1, 'Standard Single Room', 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 5 rooms left at this price!', 5000, '/Images/single room.png', 'Jaffna', 1, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Free Cancellation'), TRUE),
-- (2, 'Double Room', 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!', 10000, '/Images/double room.jpg', 'Jaffna', 2, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Mini Bar','Free Cancellation'), TRUE),
-- (3, 'Deluxe Room', 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', 25000, '/Images/deluxe room.jpg', 'Jaffna', 2, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Mini Bar','Room Service','Balcony','Free Cancellation'), TRUE),
-- (4, 'Standard Single Room', 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 4 rooms left at this price!', 5000, '/Images/single room.png', 'Kilinochchi', 1, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Free Cancellation'), TRUE),
-- (5, 'Double Room', 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 2 rooms left at this special rate!', 10000, '/Images/double room.jpg', 'Kilinochchi', 2, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Mini Bar','Free Cancellation'), TRUE),
-- (6, 'Deluxe Room', 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', 25000, '/Images/deluxe room.jpg', 'Kilinochchi', 2, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Mini Bar','Room Service','Free Cancellation'), TRUE),
-- (7, 'Standard Single Room', 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 6 rooms left at this price!', 5000, '/Images/single room.png', 'Mannar', 1, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Free Cancellation'), TRUE),
-- (8, 'Double Room', 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!', 10000, '/Images/double room.jpg', 'Mannar', 2, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Mini Bar','Free Cancellation'), TRUE),
-- (9, 'Deluxe Room', 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!', 25000, '/Images/deluxe room.jpg', 'Mannar', 2, JSON_ARRAY('Wi-Fi','TV','Air Conditioning','Mini Bar','Room Service','Balcony','Free Cancellation'), TRUE);

