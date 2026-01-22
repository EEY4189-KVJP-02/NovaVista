-- ---------------------------------------------
-- 1️⃣ Create database if it doesn't exist
-- ---------------------------------------------
CREATE DATABASE IF NOT EXISTS novavistaDB;

-- Use the database
USE novavistaDB;

-- ---------------------------------------------
-- 2️⃣ Create or update MySQL user
-- ---------------------------------------------
-- If the user exists, update the password
ALTER USER 'nova_vista'@'localhost' IDENTIFIED BY 'nova';

-- If the user does not exist, create it
CREATE USER IF NOT EXISTS 'nova_vista'@'localhost' IDENTIFIED BY 'nova';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON novavistaDB.* TO 'nova_vista'@'localhost';
FLUSH PRIVILEGES;

-- ---------------------------------------------
-- 3️⃣ Create event_bookings table (if not exists)
-- Sequelize can also create this, but you can define manually
-- ---------------------------------------------
CREATE TABLE IF NOT EXISTS event_bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eventDate DATE NOT NULL,
    eventType VARCHAR(255) NOT NULL,
    timeSlot VARCHAR(255) NOT NULL,
    budget VARCHAR(255) NOT NULL,
    decoration VARCHAR(255) NOT NULL,
    catering VARCHAR(255) NOT NULL,
    terms BOOLEAN NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Optional: check the table
SHOW TABLES;
SELECT * FROM event_bookings;



