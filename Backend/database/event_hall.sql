USE nova_vistaDB;

DROP TABLE IF EXISTS event_halls;

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


-- DROP TABLE IF EXISTS hall_availability;

CREATE TABLE hall_availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    hall_id INT,
    booking_date DATE,
    time_slot ENUM('Morning','Evening','Full Day'),
    FOREIGN KEY (hall_id) REFERENCES event_halls(id)
    
);
INSERT INTO event_halls (name, location, seating, capacity, description, rating, image) VALUES
( 'Breakout Hall', 'Jaffna', 'Boardroom', 300, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 5, 'hall1.png'),
( 'Executive Boardroom', 'Jaffna', 'Boardroom', 60, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 4, 'hall10.png'),
('Reception Hall', 'Jaffna', 'Boardroom', 150, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall2.png'),
( 'Auditorium', 'Jaffna', 'Boardroom', 650, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 3, 'hall3.png'),
( 'Meeting Room', 'Jaffna', 'Circular', 60, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 4, 'hall12.png'),
( 'A Breakout Space', 'Jaffna', 'Circular', 150, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 5, 'hall8.png'),
( 'Workshop Hall', 'Jaffna', 'Circular', 600, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall4.png'),
( 'Breakout Hall', 'Jaffna', 'Theater', 350, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 5, 'hall6.png'),
( 'Executive Boardroom', 'Jaffna', 'Theater', 80, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 5, 'hall9.png'),
( 'Reception Hall', 'Jaffna', 'Theater', 180, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall5.png'),
( 'Auditorium', 'Jaffna', 'Theater', 700, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 4, 'hall8.png'),
( 'Breakout Hall', 'Jaffna', 'U-Shaped', 400, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 4, 'hall7.png'),
( 'Executive Boardroom', 'Jaffna', 'U-Shaped', 50, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 3, 'hall11.png'),
( 'Reception Hall', 'Jaffna', 'U-Shaped', 200, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 5, 'hall8.png'),
( 'Auditorium', 'Jaffna', 'U-Shaped', 550, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 4, 'hall12.png'),
( 'Breakout Hall', 'Kilinochchi', 'Boardroom', 300, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 5, 'hall1.png'),
( 'Executive Boardroom', 'Kilinochchi', 'Boardroom', 60, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 4, 'hall10.png'),
( 'Reception Hall', 'Kilinochchi', 'Boardroom', 150, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall2.png'),
( 'Auditorium', 'Kilinochchi', 'Boardroom', 650, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 3, 'hall3.png'),
( 'Meeting Room', 'Kilinochchi', 'Circular', 60, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 4, 'hall12.png'),
( 'A Breakout Space', 'Kilinochchi', 'Circular', 150, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 5, 'hall8.png'),
( 'Workshop Hall', 'Kilinochchi', 'Circular', 600, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall4.png'),
( 'Breakout Hall', 'Kilinochchi', 'Theater', 350, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 5, 'hall6.png'),
( 'Executive Boardroom', 'Kilinochchi', 'Theater', 80, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 5, 'hall9.png'),
( 'Reception Hall', 'Kilinochchi', 'Theater', 180, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall5.png'),
('Auditorium', 'Kilinochchi', 'Theater', 700, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 4, 'hall8.png'),
( 'Breakout Hall', 'Kilinochchi', 'U-Shaped', 400, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 4, 'hall7.png'),
( 'Executive Boardroom', 'Kilinochchi', 'U-Shaped', 50, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 3, 'hall11.png'),
( 'Reception Hall', 'Kilinochchi', 'U-Shaped', 200, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 5, 'hall8.png'),
('Auditorium', 'Kilinochchi', 'U-Shaped', 550, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 4, 'hall12.png'),
( 'Breakout Hall', 'Mannar', 'Boardroom', 300, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 5, 'hall1.png'),
( 'Executive Boardroom', 'Mannar', 'Boardroom', 60, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 4, 'hall10.png'),
( 'Reception Hall', 'Mannar', 'Boardroom', 150, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall2.png'),
( 'Auditorium', 'Mannar', 'Boardroom', 650, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 3, 'hall3.png'),
( 'Meeting Room', 'Mannar', 'Circular', 60, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 4, 'hall12.png'),
( 'A Breakout Space', 'Mannar', 'Circular', 150, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 5, 'hall8.png'),
( 'Workshop Hall', 'Mannar', 'Circular', 600, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 4, 'hall4.png'),
( 'Breakout Hall', 'Mannar', 'Theater', 350, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 5, 'hall6.png'),
('Executive Boardroom', 'Mannar', 'Theater', 80, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 5, 'hall9.png'),
('Reception Hall', 'Mannar', 'Theater', 180, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 4, 'hall5.png'),
( 'Auditorium', 'Mannar', 'Theater', 700, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 4, 'hall8.png'),
( 'Breakout Hall', 'Mannar', 'U-Shaped', 400, 'Perfect for gala dinners, networking events, and corporate celebrations with elegant spacious interior', 4, 'hall7.png'),
( 'Executive Boardroom', 'Mannar', 'U-Shaped', 50, 'Ideal for executive meetings, business discussions, and professional presentations in a private environment.', 3, 'hall11.png'),
( 'Reception Hall', 'Mannar', 'U-Shaped', 200, 'Flexible space designed for workshops, brainstorming sessions, and team collaboration activities.', 5, 'hall8.png'),
('Auditorium', 'Mannar', 'U-Shaped', 550, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 4, 'hall12.png'),
( 'Reception Hall', 'jaffna', 'Circular', 300, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 4, 'hall9.png'),
('Reception Hall', 'Kilinochchi', 'Circular', 300, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 46, 'hall10.png'),
( 'Reception Hall', 'Manna', 'Circular', 350, 'Open style hall suitable for ceremonies, receptions, and relaxed social gatherings.', 5, 'hall10.png');


INSERT INTO hall_availability (hall_id, booking_date, time_slot) VALUES
-- Jaffna halls
(1,'2026-04-01','Morning'),     
(1,'2026-04-01','Evening'),
(1,'2026-04-02','Full Day'),
(2,'2026-04-01','Morning'),    
(2,'2026-04-03','Full Day'),
(3,'2026-04-05','Morning'),     
(3,'2026-04-05','Evening'),
(6,'2026-04-02','Full Day'),    
(5,'2026-04-10','Morning'),     
(5,'2026-04-10','Evening'),
(7,'2026-04-11','Full Day'),    
(8,'2026-04-12','Morning'),    
(8,'2026-04-12','Evening'),
(9,'2026-04-13','Full Day'),    
(10,'2026-04-15','Morning'),   
(10,'2026-04-15','Evening'),
(11,'2026-04-16','Full Day'),  
(12,'2026-04-18','Morning'),    
(13,'2026-04-20','Evening'),    

-- Kilinochchi halls (add some variety)
(16,'2026-04-01','Morning'),    
(17,'2026-04-02','Full Day'), 
(20,'2026-04-03','Morning'),    
(21,'2026-04-03','Evening'),    
(23,'2026-04-05','Full Day'),   

-- Mannar halls (add some variety)
(31,'2026-04-01','Evening'),    
(32,'2026-04-02','Morning'),    
(35,'2026-04-04','Full Day'),  
(38,'2026-04-06','Morning'),    
(38,'2026-04-06','Evening'),
(42,'2026-04-07','Full Day');   

SELECT * from  hall_availability;

SELECT 
h.id,
h.name,
h.location,
h.seating,
h.capacity,
h.description,
h.rating,
h.image,
a.booking_date,
a.time_slot

FROM event_halls h
LEFT JOIN hall_availability a
ON h.id = a.hall_id;

SELECT * from  event_halls;
