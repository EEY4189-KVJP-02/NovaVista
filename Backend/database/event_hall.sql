create database nova_vistaDB;
USE nova_vistaDB;

-- Drop table if it exists
DROP TABLE IF EXISTS event_halls;

-- Create table
CREATE TABLE event_halls (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    seating VARCHAR(50),
    capacity INT,
    description TEXT,
    rating INT DEFAULT 5,
    image VARCHAR(255)
);

INSERT INTO event_halls (name, location, seating, capacity, description, rating, image) VALUES

-- Jaffna
('Ballroom', 'Jaffna', 'Theater', 300, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior.', 5, 'hall1.png'),
('Boardroom', 'Jaffna', 'Boardroom', 60, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 4, 'hall2.png'),
('Breakout Space', 'Jaffna', 'U-Shaped', 120, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall3.png'),
('A Breakout Space', 'Jaffna', 'Circular', 180, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 5, 'hall4.png'),

-- Kilinochchi
('Conference Hall', 'Kilinochchi', 'Theater', 250, 'Spacious conference hall ideal for seminars, corporate events, and professional presentations.', 5, 'hall5.png'),
('Meeting Room', 'Kilinochchi', 'Boardroom', 70, 'Comfortable meeting room suitable for business discussions, planning sessions, and presentations.', 4, 'hall6.png'),
('Training Hall', 'Kilinochchi', 'U-Shaped', 100, 'Designed for training programmes, workshops, and collaborative learning sessions.', 4, 'hall7.png'),
('Reception Hall', 'Kilinochchi', 'Circular', 200, 'Elegant reception hall suitable for celebrations, networking events, and corporate gatherings.', 5, 'hall8.png'),

-- Mannar
('Auditorium', 'Mannar', 'Theater', 400, 'Large auditorium suitable for conferences, lectures, and large public events.', 5, 'hall9.png'),
('Executive Boardroom', 'Mannar', 'Boardroom', 80, 'Professional boardroom perfect for executive meetings, negotiations, and presentations.', 4, 'hall10.png'),
('Workshop Hall', 'Mannar', 'U-Shaped', 130, 'Comfortable space designed for workshops, team discussions, and collaborative activities.', 4, 'hall11.png'),
('A Breakout Space', 'Mannar', 'Circular', 220, 'Spacious event hall suitable for social gatherings, ceremonies, and corporate celebrations.', 5, 'hall12.png');

-- Verify inserted data
SELECT * FROM event_halls;