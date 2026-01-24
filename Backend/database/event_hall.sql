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

-- Insert diverse sample data
INSERT INTO event_halls (name, location, seating, capacity, description, rating, image)
VALUES
-- Row 1
('GRAND BALLROOM', 'Jaffna', 'Boardroom', 80, 'Elegant boardroom with projector and conference setup, ideal for corporate meetings.', 5, 'grand_ballroom.jpg'),

-- Row 2
('THE EMERALD', 'Kilinochchi', 'Circular', 150, 'Circular hall with open space and natural light, perfect for workshops or training.', 4, 'emerald.jpg'),

-- Row 3
('THE GARDEN ROOM', 'Mannar', 'Theater', 200, 'Theater-style seating with stage and sound system, great for seminars or performances.', 5, 'garden_room.jpg'),

-- Row 4
('THE GOLDEN ROOM', 'Jaffna', 'U-Shaped', 100, 'U-shaped seating arrangement suitable for interactive discussions and team meetings.', 3, 'golden_room.jpg'),

-- Row 5
('THE SAPPHIRE', 'Kilinochchi', 'Boardroom', 50, 'Small, cozy boardroom for private meetings and strategy sessions.', 4, 'sapphire.jpg'),

-- Row 6
('THE RUBY HALL', 'Mannar', 'Circular', 300, 'Large circular hall for weddings, conferences, or social events with flexible layout.', 5, 'ruby_hall.jpg');

-- Verify inserted data
SELECT * FROM event_halls;
