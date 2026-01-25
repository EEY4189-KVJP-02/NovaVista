import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RoomBookingForm from "./RoomBookingForm";
import { roomBookingService, Room, RoomFilters } from "../../services/RoomBooking";
import "./RoomDetails.css";

const REQUIRED_ROOM_TYPES = ["Standard Single Room", "Double Room", "Deluxe Room"] as const;

const RoomDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [roomAvailability, setRoomAvailability] = useState<Record<number, boolean>>({});
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const checkingRef = useRef<string>("");

  // Get initial values from URL params
  const locationFromUrl = searchParams.get("location") || "";
  const checkInFromUrl = searchParams.get("checkIn") || "";
  const checkOutFromUrl = searchParams.get("checkOut") || "";

  const initialBranch =
    locationFromUrl === "Jaffna, Sri Lanka"
      ? "Jaffna"
      : locationFromUrl === "Kilinochchi, Sri Lanka"
        ? "Kilinochchi"
        : locationFromUrl === "Mannar, Sri Lanka"
          ? "Mannar"
          : "Jaffna";

  const [filters, setFilters] = useState<RoomFilters>({
    branch: initialBranch as "Jaffna" | "Kilinochchi" | "Mannar",
    checkInDate: checkInFromUrl || undefined,
    checkOutDate: checkOutFromUrl || undefined,
  });

  const [checkInDate, setCheckInDate] = useState<string>(checkInFromUrl);
  const [checkOutDate, setCheckOutDate] = useState<string>(checkOutFromUrl);
  const [selectedLocation, setSelectedLocation] = useState<string>(initialBranch);

  useEffect(() => {
    const loc = searchParams.get("location") || "";
    const ci = searchParams.get("checkIn") || "";
    const co = searchParams.get("checkOut") || "";

    const branch =
      loc === "Jaffna, Sri Lanka"
        ? "Jaffna"
        : loc === "Kilinochchi, Sri Lanka"
          ? "Kilinochchi"
          : loc === "Mannar, Sri Lanka"
            ? "Mannar"
            : undefined;

    const defaultBranch = (branch || "Jaffna") as "Jaffna" | "Kilinochchi" | "Mannar";

    setFilters({
      branch: defaultBranch,
      checkInDate: ci || undefined,
      checkOutDate: co || undefined,
      minPrice: undefined,
      maxPrice: undefined,
      maxGuests: undefined,
    });

    setCheckInDate(ci);
    setCheckOutDate(co);
    setSelectedLocation(defaultBranch);
  }, [searchParams]);

  const getFallbackRooms = (branch?: "Jaffna" | "Kilinochchi" | "Mannar"): Room[] => {
    const allRooms: Room[] = [
      // Jaffna
      {
        id: 1,
        type: "Standard Single Room",
        description:
          "Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 5 rooms left at this price!",
        price: 5000,
        image: "/Images/single room.png",
        branch: "Jaffna",
        maxGuests: 1,
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Free Cancellation"],
        isActive: true,
      },
      {
        id: 2,
        type: "Double Room",
        description:
          "Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!",
        price: 10000,
        image: "/Images/double room.jpg",
        branch: "Jaffna",
        maxGuests: 2,
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Free Cancellation"],
        isActive: true,
      },
      {
        id: 3,
        type: "Deluxe Room",
        description:
          "Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!",
        price: 25000,
        image: "/Images/deluxe room.jpg",
        branch: "Jaffna",
        maxGuests: 2,
        amenities: [
          "Wi-Fi",
          "TV",
          "Air Conditioning",
          "Mini Bar",
          "Room Service",
          "Balcony",
          "Free Cancellation",
        ],
        isActive: true,
      },

      // Kilinochchi
      {
        id: 4,
        type: "Standard Single Room",
        description:
          "Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 4 rooms left at this price!",
        price: 5000,
        image: "/Images/single room.png",
        branch: "Kilinochchi",
        maxGuests: 1,
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Free Cancellation"],
        isActive: true,
      },
      {
        id: 5,
        type: "Double Room",
        description:
          "Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 2 rooms left at this special rate!",
        price: 10000,
        image: "/Images/double room.jpg",
        branch: "Kilinochchi",
        maxGuests: 2,
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Free Cancellation"],
        isActive: true,
      },
      {
        id: 6,
        type: "Deluxe Room",
        description:
          "Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!",
        price: 25000,
        image: "/Images/deluxe room.jpg",
        branch: "Kilinochchi",
        maxGuests: 2,
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Room Service", "Free Cancellation"],
        isActive: true,
      },

      // Mannar
      {
        id: 7,
        type: "Standard Single Room",
        description:
          "Free Cancellation — Flexibility guaranteed\nNo Prepayment Needed — Secure your stay now, pay later\nLimited Availability — Only 6 rooms left at this price!",
        price: 5000,
        image: "/Images/single room.png",
        branch: "Mannar",
        maxGuests: 1,
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Free Cancellation"],
        isActive: true,
      },
      {
        id: 8,
        type: "Double Room",
        description:
          "Free Cancellation — Book with confidence\nNo Prepayment Needed — Pay at the hotel\nLimited Availability — Only 3 rooms left at this special rate!",
        price: 10000,
        image: "/Images/double room.jpg",
        branch: "Mannar",
        maxGuests: 2,
        amenities: ["Wi-Fi", "TV", "Air Conditioning", "Mini Bar", "Free Cancellation"],
        isActive: true,
      },
      {
        id: 9,
        type: "Deluxe Room",
        description:
          "Free Cancellation — Change plans anytime\nNo Prepayment Required — Easy booking, stress-free payment\nLimited Availability — Exclusive price!",
        price: 25000,
        image: "/Images/deluxe room.jpg",
        branch: "Mannar",
        maxGuests: 2,
        amenities: [
          "Wi-Fi",
          "TV",
          "Air Conditioning",
          "Mini Bar",
          "Room Service",
          "Balcony",
          "Free Cancellation",
        ],
        isActive: true,
      },
    ];

    return branch ? allRooms.filter((r) => r.branch === branch) : allRooms;
  };

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roomBookingService.fetchRooms(filters);
      setRooms(data && data.length > 0 ? data : getFallbackRooms(filters.branch));
    } catch (err: any) {
      console.warn("Error fetching rooms, using fallback data:", err);
      setRooms(getFallbackRooms(filters.branch));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleLocationChange = (location: string) => {
    setSelectedLocation(location);
    setFilters({
      branch: (location === "Jaffna" || location === "Kilinochchi" || location === "Mannar"
        ? (location as "Jaffna" | "Kilinochchi" | "Mannar")
        : undefined),
      checkInDate: checkInDate || undefined,
      checkOutDate: checkOutDate || undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      maxGuests: filters.maxGuests,
    });
  };

  const handleSearch = () => {
    setFilters({
      branch: (selectedLocation === "Jaffna" || selectedLocation === "Kilinochchi" || selectedLocation === "Mannar"
        ? (selectedLocation as "Jaffna" | "Kilinochchi" | "Mannar")
        : undefined),
      checkInDate: checkInDate || undefined,
      checkOutDate: checkOutDate || undefined,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      maxGuests: filters.maxGuests,
    });
  };

  const handleBookNow = (room: Room) => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates first.");
      return;
    }
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    fetchRooms();
    setShowBookingForm(false);
    setSelectedRoom(null);
  };

  const displayRooms = useMemo(() => {
    const filteredRooms = rooms.filter((room) => {
      if (!selectedLocation) return false;
      return REQUIRED_ROOM_TYPES.some((type) => room.type.toLowerCase().includes(type.toLowerCase()));
    });

    const sortedRooms = [...filteredRooms].sort((a, b) => {
      const order = (type: string) => {
        if (type.toLowerCase().includes("standard single")) return 1;
        if (type.toLowerCase().includes("double") && !type.toLowerCase().includes("deluxe")) return 2;
        if (type.toLowerCase().includes("deluxe")) return 3;
        return 4;
      };
      return order(a.type) - order(b.type);
    });

    return sortedRooms.slice(0, 3);
  }, [rooms, selectedLocation]);

  // Check availability for all rooms when dates change
  useEffect(() => {
    if (!checkInDate || !checkOutDate || displayRooms.length === 0) {
      setRoomAvailability({});
      setCheckingAvailability(false);
      checkingRef.current = "";
      return;
    }

    const checkKey = `${checkInDate}-${checkOutDate}-${displayRooms.map((r) => r.id).join(",")}`;
    if (checkingRef.current === checkKey) return;

    let isCancelled = false;
    checkingRef.current = checkKey;

    const timeoutId = setTimeout(() => {
      if (isCancelled || checkingRef.current !== checkKey) return;

      const run = async () => {
        if (isCancelled || checkingRef.current !== checkKey) return;

        setCheckingAvailability(true);
        const availabilityMap: Record<number, boolean> = {};

        try {
          await Promise.all(
            displayRooms.map(async (room) => {
              try {
                const availability = await roomBookingService.checkAvailability(room.id, checkInDate, checkOutDate);
                availabilityMap[room.id] = availability.isAvailable;
              } catch {
                availabilityMap[room.id] = true; // fallback rooms / API issues
              }
            })
          );

          if (!isCancelled && checkingRef.current === checkKey) {
            setRoomAvailability(availabilityMap);
            setCheckingAvailability(false);
          }
        } catch {
          if (!isCancelled && checkingRef.current === checkKey) {
            displayRooms.forEach((room) => (availabilityMap[room.id] = true));
            setRoomAvailability(availabilityMap);
            setCheckingAvailability(false);
          }
        }
      };

      run();
    }, 500);

    return () => {
      isCancelled = true;
      if (checkingRef.current === checkKey) checkingRef.current = "";
      clearTimeout(timeoutId);
    };
  }, [checkInDate, checkOutDate, displayRooms]);

  return (
    <div className="room-details-page">
      <div className="page-header">
        <h1 className="page-title">Room Details</h1>
      </div>

      <div className="featured-room-section">
        <img src="/Images/HD.jpg" alt="Featured Luxury Room" className="featured-image" />
      </div>

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
                    const next = e.target.value;
                    setCheckInDate(next);
                    if (next) {
                      setFilters((prev) => ({ ...prev, checkInDate: next }));
                    }
                  }}
                  min={new Date().toISOString().split("T")[0]}
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
                    const next = e.target.value;
                    if (checkInDate && next <= checkInDate) {
                      alert("Check-out date must be after check-in date");
                      return;
                    }
                    setCheckOutDate(next);
                    if (next) {
                      setFilters((prev) => ({ ...prev, checkOutDate: next }));
                    }
                  }}
                  min={
                    checkInDate
                      ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  className="date-input"
                />
              </div>
            </div>

            <div className="dropdown-inputs">
              <div className="dropdown-group">
                <label>Hotel Location</label>
                <select value={selectedLocation} onChange={(e) => handleLocationChange(e.target.value)} className="dropdown-select">
                  <option value="">Select Location</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Mannar">Mannar</option>
                </select>
              </div>
            </div>

            <button className="search-button" onClick={handleSearch} aria-label="Search rooms">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container room-listings-section">
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && !selectedLocation && (
          <div className="alert alert-info">Please select a hotel location to view available rooms.</div>
        )}

        {!loading && !error && displayRooms.length > 0 && (
          <div className="room-listings">
            {displayRooms.map((room) => {
              const datesSelected = !!checkInDate && !!checkOutDate;
              const isAvailable = datesSelected ? (roomAvailability[room.id] ?? true) : true;
              const isSoldOut = datesSelected ? !isAvailable : false;

              const nights =
                datesSelected
                  ? Math.ceil(
                      (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)
                    )
                  : 0;

              return (
                <div key={room.id} className="room-listing-item">
                  <div className="room-listing-image">
                    <img
                      src={room.image?.startsWith("/Images/") ? room.image : room.image?.startsWith("/") ? room.image : `/Images/${room.image}`}
                      alt={room.type}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (room.type.toLowerCase().includes("single")) target.src = "/Images/single room.png";
                        else if (room.type.toLowerCase().includes("double") && !room.type.toLowerCase().includes("deluxe"))
                          target.src = "/Images/double room.jpg";
                        else if (room.type.toLowerCase().includes("deluxe")) target.src = "/Images/deluxe room.jpg";
                        else target.src = "/Images/single room.png";
                      }}
                    />
                    {isSoldOut && <div className="sold-out-badge">Sold Out</div>}
                  </div>

                  <div className="room-listing-content">
                    <div className="room-listing-info">
                      <div className="room-header">
                        <h3>{room.type}</h3>
                        <span className="room-location-badge">{room.branch}</span>
                      </div>

                      <div className="room-benefits">
                        <span className="benefit-badge free-cancellation">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                          </svg>
                          Free Cancellation
                        </span>
                        <span className="benefit-badge no-prepayment">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                            <line x1="1" y1="10" x2="23" y2="10" />
                          </svg>
                          No Prepayment
                        </span>
                      </div>

                      <div className="room-description">
                        {room.description?.split("\n").map((line, index) => <p key={index}>{line}</p>)}
                      </div>

                      {datesSelected ? (
                        <div className="availability-indicator">
                          {checkingAvailability ? (
                            <span className="availability-checking">Checking availability...</span>
                          ) : isAvailable ? (
                            <span className="availability-good">✓ Available for selected dates</span>
                          ) : (
                            <span className="availability-bad">✗ Not available for selected dates</span>
                          )}
                        </div>
                      ) : (
                        <div className="availability-indicator">
                          <span className="availability-info">Select dates to check availability</span>
                        </div>
                      )}
                    </div>

                    <div className="room-listing-action">
                      <div className="price-section">
                        <div className="room-price-per-night">
                          LKR {Number(room.price).toFixed(0)} <span className="price-unit">/night</span>
                        </div>
                        {datesSelected && (
                          <div className="room-total-price">Total: LKR {(Number(room.price) * nights).toFixed(0)}</div>
                        )}
                      </div>

                      <button
                        className="book-now-button"
                        onClick={() => handleBookNow(room)}
                        disabled={!datesSelected || isSoldOut || (datesSelected && !isAvailable)}
                      >
                        {!datesSelected ? "SELECT DATES" : isSoldOut || !isAvailable ? "NOT AVAILABLE" : "BOOK"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

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
