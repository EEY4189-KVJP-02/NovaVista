USE nova_vistaDB;

-- ---------------------------------------------
-- Room bookings table (used by /api/rooms/:id/book)
-- Matches Backend/models/RoomBooking.js
-- ---------------------------------------------

CREATE TABLE IF NOT EXISTS room_bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NULL,
  roomId INT NOT NULL,
  guestName VARCHAR(255) NOT NULL,
  guestEmail VARCHAR(255) NOT NULL,
  guestPhone VARCHAR(50) NOT NULL,
  checkInDate DATE NOT NULL,
  checkOutDate DATE NOT NULL,
  numberOfGuests INT NOT NULL DEFAULT 1,
  totalPrice DECIMAL(10, 2) NOT NULL,
  status ENUM('pending','confirmed','cancelled','checked_in','checked_out') NOT NULL DEFAULT 'pending',
  specialRequests TEXT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_room_bookings_roomId ON room_bookings (roomId);
CREATE INDEX idx_room_bookings_dates ON room_bookings (checkInDate, checkOutDate);
CREATE INDEX idx_room_bookings_status ON room_bookings (status);

