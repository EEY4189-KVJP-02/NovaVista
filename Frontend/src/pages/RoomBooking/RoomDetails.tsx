import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomBookingForm from './RoomBookingForm';
import { roomBookingService, Room, RoomFilters } from '../../services/RoomBooking';
import './RoomDetails.css';

const RoomDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Get initial values from URL params
  const locationFromUrl = searchParams.get('location') || '';
  const checkInFromUrl = searchParams.get('checkIn') || '';
  const checkOutFromUrl = searchParams.get('checkOut') || '';
  
  // Filter states
  const [filters, setFilters] = useState<RoomFilters>({
    branch: locationFromUrl === 'Jaffna, Sri Lanka' ? 'Jaffna' : 
           locationFromUrl === 'Kilinochchi, Sri Lanka' ? 'Kilinochchi' :
           locationFromUrl === 'Mannar, Sri Lanka' ? 'Mannar' : undefined,
    checkInDate: checkInFromUrl || undefined,
    checkOutDate: checkOutFromUrl || undefined,
    minPrice: undefined,
    maxPrice: undefined,
    maxGuests: undefined,
  });

  const [checkInDate, setCheckInDate] = useState<string>(checkInFromUrl);
  const [checkOutDate, setCheckOutDate] = useState<string>(checkOutFromUrl);
  const [selectedLocation, setSelectedLocation] = useState<string>(
    locationFromUrl === 'Jaffna, Sri Lanka' ? 'Jaffna' :
    locationFromUrl === 'Kilinochchi, Sri Lanka' ? 'Kilinochchi' :
    locationFromUrl === 'Mannar, Sri Lanka' ? 'Mannar' : ''
  );

  // Update filters when URL params change
  useEffect(() => {
    const locationFromUrl = searchParams.get('location') || '';
    const checkInFromUrl = searchParams.get('checkIn') || '';
    const checkOutFromUrl = searchParams.get('checkOut') || '';
    
    const branch = locationFromUrl === 'Jaffna, Sri Lanka' ? 'Jaffna' : 
                   locationFromUrl === 'Kilinochchi, Sri Lanka' ? 'Kilinochchi' :
                   locationFromUrl === 'Mannar, Sri Lanka' ? 'Mannar' : undefined;
    
    setFilters({
      branch: branch,
      checkInDate: checkInFromUrl || undefined,
      checkOutDate: checkOutFromUrl || undefined,
      minPrice: undefined,
      maxPrice: undefined,
      maxGuests: undefined,
    });
    
    setCheckInDate(checkInFromUrl);
    setCheckOutDate(checkOutFromUrl);
    setSelectedLocation(
      locationFromUrl === 'Jaffna, Sri Lanka' ? 'Jaffna' :
      locationFromUrl === 'Kilinochchi, Sri Lanka' ? 'Kilinochchi' :
      locationFromUrl === 'Mannar, Sri Lanka' ? 'Mannar' : ''
    );
  }, [searchParams]);

  useEffect(() => {
    fetchRooms();
  }, [filters]);

  // Fallback room data for all 9 rooms (3 per location) with unique images
  const getFallbackRooms = (branch?: "Jaffna" | "Kilinochchi" | "Mannar"): Room[] => {
    const allRooms: Room[] = [
      // Jaffna Branch - Unique IDs: 1, 2, 3
      {
        id: 1,
        type: 'Standard Single Room',
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 5 rooms left at this price!',
        price: 5000,
        image: '/Images/jaffna-single-room.jpg',
        branch: 'Jaffna',
        maxGuests: 1,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'],
        isActive: true,
      },
      {
        id: 2,
        type: 'Double Room',
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!',
        price: 10000,
        image: '/Images/jaffna-double-room.jpg',
        branch: 'Jaffna',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'],
        isActive: true,
      },
      {
        id: 3,
        type: 'Deluxe Room',
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!',
        price: 25000,
        image: '/Images/jaffna-deluxe-room.jpg',
        branch: 'Jaffna',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Free Cancellation'],
        isActive: true,
      },
      // Kilinochchi Branch - Unique IDs: 4, 5, 6
      {
        id: 4,
        type: 'Standard Single Room',
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 4 rooms left at this price!',
        price: 5000,
        image: '/Images/kilinochchi-single-room.jpg',
        branch: 'Kilinochchi',
        maxGuests: 1,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'],
        isActive: true,
      },
      {
        id: 5,
        type: 'Double Room',
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 2 rooms left at this special rate!',
        price: 10000,
        image: '/Images/kilinochchi-double-room.jpg',
        branch: 'Kilinochchi',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'],
        isActive: true,
      },
      {
        id: 6,
        type: 'Deluxe Room',
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!',
        price: 25000,
        image: '/Images/kilinochchi-deluxe-room.jpg',
        branch: 'Kilinochchi',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Free Cancellation'],
        isActive: true,
      },
      // Mannar Branch - Unique IDs: 7, 8, 9
      {
        id: 7,
        type: 'Standard Single Room',
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 6 rooms left at this price!',
        price: 5000,
        image: '/Images/mannar-single-room.jpg',
        branch: 'Mannar',
        maxGuests: 1,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Free Cancellation'],
        isActive: true,
      },
      {
        id: 8,
        type: 'Double Room',
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!',
        price: 10000,
        image: '/Images/mannar-double-room.jpg',
        branch: 'Mannar',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Free Cancellation'],
        isActive: true,
      },
      {
        id: 9,
        type: 'Deluxe Room',
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!',
        price: 25000,
        image: '/Images/mannar-deluxe-room.jpg',
        branch: 'Mannar',
        maxGuests: 2,
        amenities: ['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Balcony', 'Free Cancellation'],
        isActive: true,
      },
    ];

    if (branch) {
      return allRooms.filter(room => room.branch === branch);
    }
    return allRooms;
  };

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roomBookingService.fetchRooms(filters);
      // Use fallback data if API returns empty or fails
      if (data && data.length > 0) {
        setRooms(data);
      } else {
        // Use fallback data when API returns empty
        setRooms(getFallbackRooms(filters.branch));
      }
    } catch (err: any) {
      console.warn('Error fetching rooms, using fallback data:', err);
      // Use fallback data when API fails
      setRooms(getFallbackRooms(filters.branch));
    } finally {
      setLoading(false);
    }
  };

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    // Automatically update filters when location changes
    const newFilters: RoomFilters = {
      branch: (location === 'Jaffna' || location === 'Kilinochchi' || location === 'Mannar') 
        ? location as "Jaffna" | "Kilinochchi" | "Mannar"
        : undefined,
      checkInDate: checkInDate || undefined,
      checkOutDate: checkOutDate || undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      maxGuests: filters.maxGuests,
    };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    const newFilters: RoomFilters = {
      branch: (selectedLocation === 'Jaffna' || selectedLocation === 'Kilinochchi' || selectedLocation === 'Mannar') 
        ? selectedLocation as "Jaffna" | "Kilinochchi" | "Mannar"
        : undefined,
      checkInDate: checkInDate || undefined,
      checkOutDate: checkOutDate || undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      maxGuests: filters.maxGuests,
    };

    setFilters(newFilters);
  };

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    fetchRooms();
    setShowBookingForm(false);
    setSelectedRoom(null);
  };

  // Filter rooms to show exactly 3 room types per location
  // Required room types: Standard Single Room, Double Room, Deluxe Room
  const requiredRoomTypes = ['Standard Single Room', 'Double Room', 'Deluxe Room'];
  
  // Filter rooms by location and required types
  const filteredRooms = rooms.filter(room => {
    // Only show rooms if a location is selected
    if (!selectedLocation) {
      return false;
    }
    // Show only the 3 required room types for the selected location
    return requiredRoomTypes.some(type => 
      room.type.toLowerCase().includes(type.toLowerCase())
    );
  });

  // Sort rooms to always show in the same order: Standard Single Room, Double Room, Deluxe Room
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    const getRoomOrder = (type: string) => {
      if (type.toLowerCase().includes('standard single')) return 1;
      if (type.toLowerCase().includes('double') && !type.toLowerCase().includes('deluxe')) return 2;
      if (type.toLowerCase().includes('deluxe')) return 3;
      return 4;
    };
    return getRoomOrder(a.type) - getRoomOrder(b.type);
  });

  // Limit to exactly 3 rooms per location
  const displayRooms = sortedRooms.slice(0, 3);

  return (
    <div className="room-details-page">
      {/* Page Title */}
      <div className="page-header">
        <h1 className="page-title">Room Details</h1>
      </div>

      {/* Featured Room Image */}
      <div className="featured-room-section">
        <img 
          src="/Images/HD.jpg" 
          alt="Featured Luxury Room" 
          className="featured-image"
        />
      </div>

      {/* Booking Search Bar Section */}
      <div className="booking-search-section">
        <div className="container">
          <div className="booking-search-bar">
            <div className="date-inputs">
              <div className="date-input-group">
                <label>Check In</label>
                <input
                  type="date"
                  value={checkInDate}
                  onChange={(e) => {
                    const newCheckIn = e.target.value;
                    setCheckInDate(newCheckIn);
                    // Update filters when date changes
                    if (newCheckIn) {
                      const newFilters: RoomFilters = {
                        branch: (selectedLocation === 'Jaffna' || selectedLocation === 'Kilinochchi' || selectedLocation === 'Mannar') 
                          ? selectedLocation as "Jaffna" | "Kilinochchi" | "Mannar"
                          : undefined,
                        checkInDate: newCheckIn || undefined,
                        checkOutDate: checkOutDate || undefined,
                        minPrice: filters.minPrice,
                        maxPrice: filters.maxPrice,
                        maxGuests: filters.maxGuests,
                      };
                      setFilters(newFilters);
                    }
                  }}
                  min={new Date().toISOString().split('T')[0]}
                  className="date-input"
                />
              </div>
              <div className="arrow-icon">→</div>
              <div className="date-input-group">
                <label>Check Out</label>
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => {
                    const selectedDate = e.target.value;
                    if (checkInDate && selectedDate <= checkInDate) {
                      alert('Check-out date must be after check-in date');
                      return;
                    }
                    setCheckOutDate(selectedDate);
                    // Update filters when date changes
                    if (selectedDate) {
                      const newFilters: RoomFilters = {
                        branch: (selectedLocation === 'Jaffna' || selectedLocation === 'Kilinochchi' || selectedLocation === 'Mannar') 
                          ? selectedLocation as "Jaffna" | "Kilinochchi" | "Mannar"
                          : undefined,
                        checkInDate: checkInDate || undefined,
                        checkOutDate: selectedDate || undefined,
                        minPrice: filters.minPrice,
                        maxPrice: filters.maxPrice,
                        maxGuests: filters.maxGuests,
                      };
                      setFilters(newFilters);
                    }
                  }}
                  min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                  className="date-input"
                />
              </div>
            </div>
            
            <div className="dropdown-inputs">
              <div className="dropdown-group">
                <label>Hotel Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="dropdown-select"
                >
                  <option value="">Select Location</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Mannar">Mannar</option>
                </select>
              </div>
            </div>

            <button className="search-button" onClick={handleSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Room Listings Section */}
      <div className="container room-listings-section">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && !selectedLocation && (
          <div className="alert alert-info" role="alert">
            Please select a hotel location to view available rooms.
          </div>
        )}

        {!loading && !error && displayRooms.length > 0 && (
          <div className="room-listings">
            {displayRooms.map((room) => {
              // Calculate availability (mock - in real app, get from API)
              const availableRooms = Math.floor(Math.random() * 5) + 1; // Mock data
              const isLowAvailability = availableRooms <= 3;
              const isSoldOut = availableRooms === 0;

              return (
                <div key={room.id} className="room-listing-item">
                  <div className="room-listing-image">
                    <img 
                      src={room.image && room.image.startsWith('/Images/') 
                        ? room.image 
                        : room.image && room.image.startsWith('/')
                        ? room.image
                        : `/Images/${room.image || 'single room.png'}`}
                      alt={room.type}
                      onError={(e) => {
                        // Fallback to default images based on room type if location-specific image not found
                        const target = e.target as HTMLImageElement;
                        if (room.type.toLowerCase().includes('single')) {
                          target.src = '/Images/single room.png';
                        } else if (room.type.toLowerCase().includes('double') && !room.type.toLowerCase().includes('deluxe')) {
                          target.src = '/Images/double room.jpg';
                        } else if (room.type.toLowerCase().includes('deluxe')) {
                          target.src = '/Images/deluxe room.jpg';
                        } else {
                          target.src = '/Images/single room.png';
                        }
                      }}
                    />
                    {isSoldOut && (
                      <div className="sold-out-badge">Sold Out</div>
                    )}
                  </div>
                  <div className="room-listing-content">
                    <div className="room-listing-info">
                      <div className="room-header">
                        <h3>{room.type}</h3>
                        <span className="room-location-badge">{room.branch}</span>
                      </div>
                      
                      {/* Key Benefits */}
                      <div className="room-benefits">
                        <span className="benefit-badge free-cancellation">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                          </svg>
                          Free Cancellation
                        </span>
                        <span className="benefit-badge no-prepayment">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                            <line x1="1" y1="10" x2="23" y2="10"></line>
                          </svg>
                          No Prepayment
                        </span>
                        {isLowAvailability && !isSoldOut && (
                          <span className="benefit-badge limited-availability">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"></circle>
                              <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            Limited Availability
                          </span>
                        )}
                      </div>

                      <div className="room-description">
                        {room.description?.split('\n').map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>

                      {/* Availability Indicator */}
                      {!isSoldOut && (
                        <div className="availability-indicator">
                          {isLowAvailability ? (
                            <span className="availability-warning">
                              ⚠️ Only {availableRooms} room{availableRooms !== 1 ? 's' : ''} left!
                            </span>
                          ) : (
                            <span className="availability-good">✓ Available</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="room-listing-action">
                      <div className="price-section">
                        <div className="room-price-per-night">
                          LKR {room.price.toFixed(0)} <span className="price-unit">/night</span>
                        </div>
                        {checkInDate && checkOutDate && (
                          <div className="room-total-price">
                            Total: LKR {(room.price * Math.ceil((new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24))).toFixed(0)}
                          </div>
                        )}
                      </div>
                      <button 
                        className="book-now-button"
                        onClick={() => handleBookNow(room)}
                        disabled={isSoldOut}
                      >
                        {isSoldOut ? 'SOLD OUT' : 'BOOK NOW'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedRoom && (
        <RoomBookingForm
          room={selectedRoom}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onBookingSuccess={handleBookingSuccess}
          onClose={() => {
            setShowBookingForm(false);
            setSelectedRoom(null);
          }}
        />
      )}
    </div>
  );
};

export default RoomDetails;
