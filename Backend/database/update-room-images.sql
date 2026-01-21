-- Update room images to location-specific paths
-- This script updates existing room records without deleting data
-- Run this if you want to update image paths without losing existing bookings

-- Jaffna Branch
UPDATE rooms 
SET image = '/Images/jaffna-single-room.jpg' 
WHERE branch = 'Jaffna' AND type = 'Standard Single Room';

UPDATE rooms 
SET image = '/Images/jaffna-double-room.jpg' 
WHERE branch = 'Jaffna' AND type = 'Double Room';

UPDATE rooms 
SET image = '/Images/jaffna-deluxe-room.jpg' 
WHERE branch = 'Jaffna' AND type = 'Deluxe Room';

-- Kilinochchi Branch
UPDATE rooms 
SET image = '/Images/kilinochchi-single-room.jpg' 
WHERE branch = 'Kilinochchi' AND type = 'Standard Single Room';

UPDATE rooms 
SET image = '/Images/kilinochchi-double-room.jpg' 
WHERE branch = 'Kilinochchi' AND type = 'Double Room';

UPDATE rooms 
SET image = '/Images/kilinochchi-deluxe-room.jpg' 
WHERE branch = 'Kilinochchi' AND type = 'Deluxe Room';

-- Mannar Branch
UPDATE rooms 
SET image = '/Images/mannar-single-room.jpg' 
WHERE branch = 'Mannar' AND type = 'Standard Single Room';

UPDATE rooms 
SET image = '/Images/mannar-double-room.jpg' 
WHERE branch = 'Mannar' AND type = 'Double Room';

UPDATE rooms 
SET image = '/Images/mannar-deluxe-room.jpg' 
WHERE branch = 'Mannar' AND type = 'Deluxe Room';
