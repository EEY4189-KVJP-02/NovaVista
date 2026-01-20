# Room Images Requirements

## Overview
Each room type at each location requires a unique image. The system uses location-specific image paths for better organization and visual distinction.

## Image Naming Convention

### Required Images (9 total)
All images should be placed in `Frontend/public/Images/` directory.

#### Jaffna Branch
- `/Images/jaffna-single-room.jpg` - Standard Single Room (ID: 1)
- `/Images/jaffna-double-room.jpg` - Double Room (ID: 2)
- `/Images/jaffna-deluxe-room.jpg` - Deluxe Room (ID: 3)

#### Kilinochchi Branch
- `/Images/kilinochchi-single-room.jpg` - Standard Single Room (ID: 4)
- `/Images/kilinochchi-double-room.jpg` - Double Room (ID: 5)
- `/Images/kilinochchi-deluxe-room.jpg` - Deluxe Room (ID: 6)

#### Mannar Branch
- `/Images/mannar-single-room.jpg` - Standard Single Room (ID: 7)
- `/Images/mannar-double-room.jpg` - Double Room (ID: 8)
- `/Images/mannar-deluxe-room.jpg` - Deluxe Room (ID: 9)

## Fallback Behavior
If a location-specific image is not found, the system will automatically fallback to:
- `single room.png` for Standard Single Room
- `double room.jpg` for Double Room
- `deluxe room.jpg` for Deluxe Room

## Room IDs
Each room has a unique ID:
- Jaffna: 1, 2, 3
- Kilinochchi: 4, 5, 6
- Mannar: 7, 8, 9

These IDs are used for:
- Database storage
- Booking tracking
- Availability checking

## Booking Logic
- Each booking is stored in the database with the room ID
- Availability is checked by querying existing bookings for the same room ID and date range
- Bookings with status "pending", "confirmed", or "checked_in" block availability
- Once a room is booked for specific dates, it cannot be booked again for overlapping dates
