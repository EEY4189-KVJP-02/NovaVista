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
('Jaffna Hall 1', 'Jaffna', 'Boardroom', 50, 'Boardroom hall suitable for meetings.', 4, 'hall1.jpg'),
('Jaffna Hall 2', 'Jaffna', 'Boardroom', 80, 'Corporate boardroom with projector.', 5, 'hall2.jpg'),
('Jaffna Hall 3', 'Jaffna', 'Circular', 120, 'Circular seating for workshops.', 4, 'hall3.jpg'),
('Jaffna Hall 4', 'Jaffna', 'Circular', 180, 'Open circular hall with lighting.', 5, 'hall4.jpg'),
('Jaffna Hall 5', 'Jaffna', 'Theater', 220, 'Theater style seminar hall.', 5, 'hall5.jpg'),
('Jaffna Hall 6', 'Jaffna', 'Theater', 300, 'Large theater hall with stage.', 4, 'hall6.jpg'),
('Jaffna Hall 7', 'Jaffna', 'U-Shaped', 90, 'U-shaped seating for discussions.', 4, 'hall7.jpg'),
('Jaffna Hall 8', 'Jaffna', 'U-Shaped', 150, 'Interactive U-shaped hall.', 5, 'hall8.jpg'),

-- Kilinochchi
('Kilinochchi Hall 1', 'Kilinochchi', 'Boardroom', 40, 'Compact boardroom setup.', 3, 'hall9.jpg'),
('Kilinochchi Hall 2', 'Kilinochchi', 'Boardroom', 70, 'Business meeting hall.', 4, 'hall10.jpg'),
('Kilinochchi Hall 3', 'Kilinochchi', 'Circular', 130, 'Circular training hall.', 4, 'hall11.jpg'),
('Kilinochchi Hall 4', 'Kilinochchi', 'Circular', 190, 'Workshop hall with open space.', 5, 'hall12.jpg'),
('Kilinochchi Hall 5', 'Kilinochchi', 'Theater', 250, 'Conference theater hall.', 5, 'hall13.jpg'),
('Kilinochchi Hall 6', 'Kilinochchi', 'Theater', 350, 'Large conference auditorium.', 4, 'hall14.jpg'),
('Kilinochchi Hall 7', 'Kilinochchi', 'U-Shaped', 100, 'U-shaped seating for teams.', 4, 'hall15.jpg'),
('Kilinochchi Hall 8', 'Kilinochchi', 'U-Shaped', 170, 'Discussion-based hall.', 5, 'hall16.jpg'),

-- Mannar
('Mannar Hall 1', 'Mannar', 'Boardroom', 60, 'Quiet boardroom for meetings.', 4, 'hall17.jpg'),
('Mannar Hall 2', 'Mannar', 'Boardroom', 90, 'Strategy meeting hall.', 5, 'hall18.jpg'),
('Mannar Hall 3', 'Mannar', 'Circular', 140, 'Circular seminar hall.', 4, 'hall19.jpg'),
('Mannar Hall 4', 'Mannar', 'Circular', 200, 'Large circular hall.', 5, 'hall20.jpg'),
('Mannar Hall 5', 'Mannar', 'Theater', 280, 'Stage-equipped theater hall.', 5, 'hall21.jpg'),
('Mannar Hall 6', 'Mannar', 'Theater', 400, 'Event theater for large audiences.', 4, 'hall22.jpg'),
('Mannar Hall 7', 'Mannar', 'U-Shaped', 110, 'U-shaped collaborative hall.', 4, 'hall23.jpg'),
('Mannar Hall 8', 'Mannar', 'U-Shaped', 180, 'Training and discussion hall.', 5, 'hall24.jpg');

-- Verify inserted data
SELECT * FROM event_halls;
