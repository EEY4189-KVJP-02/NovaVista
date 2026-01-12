import React from 'react';
import { Room } from '../../services/RoomBooking';
import './RoomCard.css';

interface RoomCardProps {
  room: Room;
  onBookNow: () => void;
  checkInDate?: string;
  checkOutDate?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBookNow, checkInDate, checkOutDate }) => {
  // Fix image path - ensure it starts with /Images/ or handle relative paths
  const getImagePath = (imagePath: string) => {
    if (!imagePath) return '/Images/single room.png'; // Default image
    
    // If already starts with /Images/, use as is
    if (imagePath.startsWith('/Images/')) {
      return imagePath;
    }
    
    // If starts with /, use as is
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    
    // Otherwise, prepend /Images/
    return `/Images/${imagePath}`;
  };

  const formatPrice = (price: number) => {
    return `LKR ${price.toFixed(2)}`;
  };

  const calculateTotal = () => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      return formatPrice(room.price * nights);
    }
    return null;
  };

  const canBook = checkInDate && checkOutDate;

  return (
    <div className="card h-100 room-card">
      <img 
        src={getImagePath(room.image)} 
        className="card-img-top room-card-image" 
        alt={room.type}
        onError={(e) => {
          // Fallback to default image if image fails to load
          (e.target as HTMLImageElement).src = '/Images/single room.png';
        }}
      />
      <div className="card-body d-flex flex-column">
        <div className="mb-2">
          <span className="badge bg-secondary">{room.branch}</span>
        </div>
        <h5 className="card-title">{room.type}</h5>
        <p className="card-text flex-grow-1" style={{ whiteSpace: 'pre-line', minHeight: '60px' }}>
          {room.description}
        </p>
        
        <div className="mb-2">
          <small className="text-muted">
            <strong>Max Guests:</strong> {room.maxGuests} | 
            <strong> Price per night:</strong> {formatPrice(room.price)}
          </small>
        </div>

        {canBook && (
          <div className="mb-2">
            <small className="text-muted d-block">
              <strong>Estimated Total:</strong> {calculateTotal()}
            </small>
          </div>
        )}

        {room.amenities && room.amenities.length > 0 && (
          <div className="mb-2">
            <small className="text-muted">
              <strong>Amenities:</strong> {room.amenities.join(', ')}
            </small>
          </div>
        )}

        <button 
          className="btn btn-primary mt-auto book-button" 
          onClick={onBookNow}
          disabled={!canBook}
          title={!canBook ? 'Please select check-in and check-out dates to book' : 'Book this room'}
        >
          {canBook ? 'BOOK NOW' : 'Select Dates First'}
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
