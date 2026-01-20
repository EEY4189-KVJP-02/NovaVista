# Room Details Page Implementation

## Overview
This document describes the implementation of the Room Details page that matches the image design provided. The page features a hero image, booking search bar, and room listings with proper image mapping and database integration.

## Files Created/Modified

### New Files
1. **`Frontend/src/pages/RoomBooking/RoomDetails.tsx`** - New room details page component matching the image design
2. **`Frontend/src/pages/RoomBooking/RoomDetails.css`** - Styling for the room details page

### Modified Files
1. **`Frontend/src/pages/RoomBooking/roombooking.tsx`** - Updated to use the new RoomDetails component
2. **`Frontend/src/App.tsx`** - Added route for `/room-details`
3. **`Backend/database/setup.sql`** - Updated with comprehensive sample data for all branches (Jaffna, Kilinochchi, Mannar) with proper image paths

## Features Implemented

### 1. Hero Image Section
- Large hero image at the top of the page
- Uses `/Images/HD.jpg` as the default hero image
- Responsive design for different screen sizes

### 2. Booking Search Bar
- Check In and Check Out date inputs with arrow icon between them
- Room Types dropdown (filters by room type)
- Hotel Location dropdown (filters by branch: Jaffna, Kilinochchi, Mannar)
- Search button with magnifying glass icon
- All inputs styled to match the image design

### 3. Room Listings
- Horizontal layout with room images on the left
- Room information (type, description) in the center
- Price displayed in a styled badge
- "BOOK NOW" button on the right
- Responsive design that stacks on mobile devices

### 4. Image Mapping
- All images are stored in `Frontend/public/Images/` folder
- Database entries use paths like `/Images/single room.png`, `/Images/double room.jpg`, `/Images/deluxe room.jpg`
- Image paths are properly handled in the component with fallback to default image
- Supports both absolute paths (starting with `/`) and relative paths

### 5. Sample Data
The database includes sample data for all three branches:

#### Jaffna Branch
- Standard Single Room (LKR 5000)
- Double Room (LKR 10000)
- Deluxe Room (LKR 25000)

#### Kilinochchi Branch
- Standard Single Room (LKR 5000)
- Double Room (LKR 10000)
- Deluxe Room (LKR 25000)

#### Mannar Branch
- Standard Single Room (LKR 5000)
- Double Room (LKR 10000)
- Deluxe Room (LKR 25000)

Each room includes:
- Proper descriptions matching the image format
- Image paths mapped to existing images
- Amenities list
- Max guests information
- Free cancellation information

### 6. Booking Functionality
- Clicking "BOOK NOW" opens a booking form modal
- Form collects guest information (name, email, phone)
- Validates check-in/check-out dates
- Checks room availability
- Calculates total price based on number of nights
- Saves booking to database via API endpoint `/api/rooms/:id/book`
- Shows success message after booking

## Database Schema
The booking data is saved to the `room_bookings` table with the following fields:
- `id` - Auto-increment primary key
- `roomId` - Foreign key to rooms table
- `guestName` - Guest's full name
- `guestEmail` - Guest's email address
- `guestPhone` - Guest's phone number
- `checkInDate` - Check-in date
- `checkOutDate` - Check-out date
- `numberOfGuests` - Number of guests
- `totalPrice` - Total price for the stay
- `status` - Booking status (pending, confirmed, cancelled, etc.)
- `specialRequests` - Optional special requests
- `createdAt` - Timestamp when booking was created
- `updatedAt` - Timestamp when booking was last updated

## Routes
- `/room-booking` - Main room booking page (uses RoomDetails component)
- `/room-details` - Alternative route to RoomDetails page

## Image Files
All hotel room images should be placed in `Frontend/public/Images/` folder:
- `single room.png` - Standard single room image
- `double room.jpg` - Double room image
- `deluxe room.jpg` - Deluxe room image
- `HD.jpg` - Hero image for the page
- `jaffna.jpg` - Jaffna branch image
- `kilinochchi.jpg` - Kilinochchi branch image
- `mannar.jpg` - Mannar branch image

## Usage
1. Navigate to `/room-booking` or `/room-details`
2. Select check-in and check-out dates
3. Optionally filter by room type or hotel location
4. Click the search button to filter rooms
5. Browse available rooms
6. Click "BOOK NOW" on any room
7. Fill in the booking form with guest details
8. Submit the booking
9. Booking is saved to the database

## Responsive Design
The page is fully responsive and adapts to:
- Desktop screens (full layout)
- Tablet screens (adjusted layout)
- Mobile screens (stacked layout)

## Styling
- Clean, modern design matching the provided image
- Light yellow background for date inputs (#fff8dc)
- Brown/red color scheme for price badges (#8b4513)
- Dark grey buttons (#495057)
- Smooth hover effects and transitions
- Professional typography
