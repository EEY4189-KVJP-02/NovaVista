import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService, EventHall } from "../../services/EventSearch";
import "./EventSearch.css";

// Required hall types - always display these 5
const requiredHallTypes = ['Boardroom', 'Hall', 'Theater', 'U-shaped', 'Circular'];

const EventSearch = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<string>("Jaffna"); // Default to Jaffna
  const [eventDate, setEventDate] = useState<string>("");
  const [guestCount, setGuestCount] = useState<number>(0);
  const [halls, setHalls] = useState<EventHall[]>([]);
  const [filteredHalls, setFilteredHalls] = useState<EventHall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hallAvailability, setHallAvailability] = useState<Record<number, boolean>>({});

  // Fallback hall data for all 15 halls (5 per location)
  const getFallbackHalls = (branch?: "Jaffna" | "Kilinochchi" | "Mannar"): EventHall[] => {
    const allHalls: EventHall[] = [
      // Jaffna Branch - IDs: 1-5 (Each hall type has unique images)
      {
        id: 1,
        name: 'Boardroom',
        location: 'Jaffna',
        seating: 'Boardroom',
        capacity: 20,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nPerfect for corporate meetings and small gatherings',
        rating: 5,
        image: '/Images/boardroom-jaffna.jpg',
        price: 5000,
      },
      {
        id: 2,
        name: 'Hall',
        location: 'Jaffna',
        seating: 'Hall',
        capacity: 200,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nIdeal for large events and celebrations',
        rating: 5,
        image: '/Images/grand-hall-jaffna.jpg',
        price: 25000,
      },
      {
        id: 3,
        name: 'Theater',
        location: 'Jaffna',
        seating: 'Theater',
        capacity: 150,
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nPerfect for presentations and conferences',
        rating: 5,
        image: '/Images/theater-jaffna.jpg',
        price: 15000,
      },
      {
        id: 4,
        name: 'U-shaped',
        location: 'Jaffna',
        seating: 'U-shaped',
        capacity: 40,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now\nGreat for interactive meetings and workshops',
        rating: 5,
        image: '/Images/ushaped-jaffna.jpg',
        price: 8000,
      },
      {
        id: 5,
        name: 'Circular',
        location: 'Jaffna',
        seating: 'Circular',
        capacity: 30,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nPerfect for roundtable discussions',
        rating: 5,
        image: '/Images/circular-jaffna.jpg',
        price: 7000,
      },
      // Kilinochchi Branch - IDs: 6-10 (Each hall type has unique images)
      {
        id: 6,
        name: 'Boardroom',
        location: 'Kilinochchi',
        seating: 'Boardroom',
        capacity: 20,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nPerfect for corporate meetings and small gatherings',
        rating: 5,
        image: '/Images/boardroom-kilinochchi.jpg',
        price: 5000,
      },
      {
        id: 7,
        name: 'Hall',
        location: 'Kilinochchi',
        seating: 'Hall',
        capacity: 200,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nIdeal for large events and celebrations',
        rating: 5,
        image: '/Images/grand-hall-kilinochchi.jpg',
        price: 25000,
      },
      {
        id: 8,
        name: 'Theater',
        location: 'Kilinochchi',
        seating: 'Theater',
        capacity: 150,
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nPerfect for presentations and conferences',
        rating: 5,
        image: '/Images/theater-kilinochchi.jpg',
        price: 15000,
      },
      {
        id: 9,
        name: 'U-shaped',
        location: 'Kilinochchi',
        seating: 'U-shaped',
        capacity: 40,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now\nGreat for interactive meetings and workshops',
        rating: 5,
        image: '/Images/ushaped-kilinochchi.jpg',
        price: 8000,
      },
      {
        id: 10,
        name: 'Circular',
        location: 'Kilinochchi',
        seating: 'Circular',
        capacity: 30,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nPerfect for roundtable discussions',
        rating: 5,
        image: '/Images/circular-kilinochchi.jpg',
        price: 7000,
      },
      // Mannar Branch - IDs: 11-15 (Each hall type has unique images)
      {
        id: 11,
        name: 'Boardroom',
        location: 'Mannar',
        seating: 'Boardroom',
        capacity: 20,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now, pay later\nPerfect for corporate meetings and small gatherings',
        rating: 5,
        image: '/Images/boardroom-mannar.jpg',
        price: 5000,
      },
      {
        id: 12,
        name: 'Hall',
        location: 'Mannar',
        seating: 'Hall',
        capacity: 200,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nIdeal for large events and celebrations',
        rating: 5,
        image: '/Images/grand-hall-mannar.jpg',
        price: 25000,
      },
      {
        id: 13,
        name: 'Theater',
        location: 'Mannar',
        seating: 'Theater',
        capacity: 150,
        description: 'Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nPerfect for presentations and conferences',
        rating: 5,
        image: '/Images/theater-mannar.jpg',
        price: 15000,
      },
      {
        id: 14,
        name: 'U-shaped',
        location: 'Mannar',
        seating: 'U-shaped',
        capacity: 40,
        description: 'Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your booking now\nGreat for interactive meetings and workshops',
        rating: 5,
        image: '/Images/ushaped-mannar.jpg',
        price: 8000,
      },
      {
        id: 15,
        name: 'Circular',
        location: 'Mannar',
        seating: 'Circular',
        capacity: 30,
        description: 'Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the venue\nPerfect for roundtable discussions',
        rating: 5,
        image: '/Images/circular-mannar.jpg',
        price: 7000,
      },
    ];

    if (branch) {
      return allHalls.filter(hall => hall.location === branch);
    }
    return allHalls;
  };

  // Fetch halls from API or use fallback
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await apiService.fetchEventHalls({ location });
        
        if (data && data.length > 0) {
          setHalls(data);
        } else {
          // Use fallback data if API returns empty
          setHalls(getFallbackHalls(location as "Jaffna" | "Kilinochchi" | "Mannar"));
        }
      } catch (err: any) {
        // Use fallback data when API fails
        console.warn('Error fetching halls, using fallback data:', err);
        setHalls(getFallbackHalls(location as "Jaffna" | "Kilinochchi" | "Mannar"));
        // Don't set error state for API failures - fallback data is available
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, [location]);

  // Filter and sort halls
  useEffect(() => {
    if (!halls || halls.length === 0) {
      setFilteredHalls([]);
      return;
    }

    let filtered = halls.filter(hall => {
      // Filter by location
      if (!hall.location || hall.location !== location) return false;
      
      // Filter by required hall types
      const hallName = hall.name?.toLowerCase() || '';
      const hallSeating = hall.seating?.toLowerCase() || '';
      if (!requiredHallTypes.some(type => 
        hallName.includes(type.toLowerCase()) ||
        hallSeating.includes(type.toLowerCase())
      )) return false;
      
      // Filter by guest count if specified
      if (guestCount > 0 && (!hall.capacity || hall.capacity < guestCount)) return false;
      
      return true;
    });

    // Sort to always show in the same order: Boardroom, Hall, Theater, U-shaped, Circular
    filtered = filtered.sort((a, b) => {
      const getOrder = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('boardroom')) return 1;
        if (lower.includes('hall') && !lower.includes('ballroom')) return 2;
        if (lower.includes('theater')) return 3;
        if (lower.includes('u-shaped') || lower.includes('ushaped')) return 4;
        if (lower.includes('circular')) return 5;
        return 6;
      };
      return getOrder(a.name) - getOrder(b.name);
    });

    // Limit to exactly 5 halls per location
    setFilteredHalls(filtered.slice(0, 5));
  }, [halls, location, guestCount]);

  // Check availability when date is selected
  useEffect(() => {
    if (!eventDate || filteredHalls.length === 0) {
      setHallAvailability({});
      return;
    }

    // Check availability for each hall
    const checkAvailability = async () => {
      const availabilityMap: Record<number, boolean> = {};
      
      try {
        for (const hall of filteredHalls) {
          try {
            // TODO: Implement API call to check hall availability
            // For now, assume all halls are available
            availabilityMap[hall.id] = true;
          } catch (err) {
            // If check fails for individual hall, assume available
            availabilityMap[hall.id] = true;
          }
        }
      } catch (err) {
        // If overall check fails, assume all halls are available
        filteredHalls.forEach(hall => {
          availabilityMap[hall.id] = true;
        });
      } finally {
        setHallAvailability(availabilityMap);
      }
    };

    checkAvailability();
  }, [eventDate, filteredHalls]);

  const handleLocationChange = (newLocation: string) => {
    setLocation(newLocation);
    // Reset date and guest count when location changes
    setEventDate("");
    setGuestCount(0);
  };

  const handleBookNow = (hall: EventHall) => {
    if (!hall || !hall.id) {
      setError('Invalid hall information. Please try again.');
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login with return URL
      const currentUrl = window.location.pathname + window.location.search;
      navigate(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }

    try {
      // Navigate to event booking page with hall details
      const params = new URLSearchParams({
        hallId: hall.id.toString(),
        location: hall.location || location,
        date: eventDate || '',
        guests: guestCount.toString() || '0',
      });
      navigate(`/event-booking?${params.toString()}`);
    } catch (err) {
      setError('Failed to navigate to booking page. Please try again.');
      console.error('Navigation error:', err);
    }
  };

  // Get default image based on hall type
  const getDefaultHallImage = (hallName: string): string => {
    const name = (hallName || '').toLowerCase();
    if (name.includes('boardroom')) {
      return '/Images/grand_ballroom.jpg'; // Fallback for boardroom
    } else if (name.includes('hall') && !name.includes('ballroom')) {
      return '/Images/grand_ballroom.jpg'; // Fallback for hall
    } else if (name.includes('theater')) {
      return '/Images/event_hero3.jpg'; // Fallback for theater
    } else if (name.includes('u-shaped') || name.includes('ushaped')) {
      return '/Images/event_hero.jpg'; // Fallback for u-shaped
    } else if (name.includes('circular')) {
      return '/Images/grand_ballroom.jpg'; // Fallback for circular
    }
    return '/Images/grand_ballroom.jpg'; // Default fallback
  };

  // Get price for hall
  const getHallPrice = (hall: EventHall): number => {
    // Use price from hall object if available
    if (hall.price && hall.price > 0) {
      return hall.price;
    }
    
    // Fallback pricing based on type
    const prices: Record<string, number> = {
      'boardroom': 5000,
      'hall': 25000,
      'theater': 15000,
      'u-shaped': 8000,
      'circular': 7000,
    };
    
    const hallType = (hall.name || '').toLowerCase();
    for (const [type, price] of Object.entries(prices)) {
      if (hallType.includes(type)) {
        return price;
      }
    }
    return 10000; // Default price
  };

  return (
    <div className="event-search-page">
      {/* Search/Filter Section */}
      <div className="event-search-section">
        <div className="container">
          <div className="event-search-bar">
            <div className="date-input-group">
              <label>Event Date</label>
              <input
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="date-input"
              />
            </div>

            <div className="guest-input-group">
              <label>Number of Guests</label>
              <input
                type="number"
                value={guestCount || ''}
                onChange={(e) => setGuestCount(Number(e.target.value) || 0)}
                min="0"
                placeholder="Enter guest count"
                className="guest-input"
              />
            </div>

            <div className="location-dropdown-group">
              <label>Hotel Location</label>
        <select
          value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="location-select"
              >
          <option value="Jaffna">Jaffna</option>
          <option value="Kilinochchi">Kilinochchi</option>
          <option value="Mannar">Mannar</option>
        </select>
            </div>
          </div>
        </div>
      </div>

      {/* Hall Listings Section */}
      <div className="container event-halls-section">
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

        {!loading && !error && filteredHalls.length === 0 && halls.length > 0 && (
          <div className="alert alert-info" role="alert">
            No event halls found matching your criteria. Please adjust your filters.
      </div>
        )}

        {!loading && !error && halls.length === 0 && (
          <div className="alert alert-warning" role="alert">
            Unable to load event halls. Please try again later.
          </div>
        )}

        {!loading && !error && filteredHalls.length > 0 && (
          <div className="event-halls-grid">
            {filteredHalls.map((hall) => {
              const price = getHallPrice(hall);
              const isAvailable = eventDate ? (hallAvailability[hall.id] ?? true) : true;
              const availabilityText = eventDate 
                ? (isAvailable ? '✓ Available' : '✗ Not Available')
                : 'Select date to check availability';

  return (
                <div key={hall.id} className="event-hall-card">
                  <div className="hall-card-image">
                    <img
                      src={hall.image || getDefaultHallImage(hall.name)}
                      alt={hall.name}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Fallback to default image based on hall type
                        const defaultImage = getDefaultHallImage(hall.name);
                        if (target.src !== defaultImage) {
                          target.src = defaultImage;
                        }
                      }}
                    />
                    {!isAvailable && eventDate && (
                      <div className="unavailable-badge">Not Available</div>
                    )}
                  </div>
                  
                  <div className="hall-card-content">
                    <div className="hall-card-header">
                      <h3>{hall.name}</h3>
                      <span className="hall-location-badge">{hall.location}</span>
                    </div>

                    <div className="hall-benefits">
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
                    </div>

                    <div className="hall-description">
                      {hall.description?.split('\n').map((line, index) => (
                        <p key={index}>{line}</p>
                      ))}
        </div>

                    {eventDate && (
                      <div className="availability-indicator">
                        <span className={isAvailable ? "availability-good" : "availability-bad"}>
                          {availabilityText}
                        </span>
                      </div>
                    )}

                    <div className="hall-card-footer">
                      <div className="hall-price-section">
                        <div className="hall-price">
                          LKR {price.toLocaleString()} <span className="price-unit">/event</span>
                        </div>
                        <div className="hall-capacity">
                          Capacity: {hall.capacity} guests
                        </div>
            </div>
                      <button
                        className="book-now-button"
                        onClick={() => handleBookNow(hall)}
                        disabled={!isAvailable && !!eventDate}
                      >
                        {!isAvailable && eventDate ? 'NOT AVAILABLE' : 'BOOK NOW'}
                      </button>
            </div>
          </div>
        </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventSearch;
