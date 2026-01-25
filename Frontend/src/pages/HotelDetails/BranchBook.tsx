// src/pages/HotelDetails/BranchBook.tsx
import React, { useEffect, useMemo, useState } from "react";
import BranchCard, { AvailabilityStatus } from "./BranchCard";
import "./BranchBook.css";
import { useNavigate } from "react-router-dom";

type Hotel = {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  images: string[];
  price_per_night?: number;
};

const API = "http://localhost:5000";

const BranchBook: React.FC = () => {
  const navigate = useNavigate();

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("1");

  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [availabilityMap, setAvailabilityMap] = useState<Record<number, AvailabilityStatus>>({});

  const isFormFilled = useMemo(() => checkIn !== "" && checkOut !== "" && rooms !== "", [checkIn, checkOut, rooms]);
  const isDateValid = useMemo(() => checkIn !== "" && checkOut !== "" && checkOut > checkIn, [checkIn, checkOut]);

  // Load hotels from DB
  useEffect(() => {
    const loadHotels = async () => {
      try {
        const res = await fetch(`${API}/api/hotels`);
        if (!res.ok) throw new Error(`Hotels API failed: ${res.status}`);

        const data = await res.json();

        const normalized: Hotel[] = (data || []).map((h: any) => ({
          id: Number(h.id),
          name: h.name ?? "",
          location: h.location ?? "",
          description: h.description ?? "",
          rating: Number(h.rating ?? 0),
          images: Array.isArray(h.images)
            ? h.images
            : typeof h.images === "string"
              ? JSON.parse(h.images)
              : [],
          price_per_night: Number(h.price_per_night ?? 0),
        }));

        setHotels(normalized);

        const initial: Record<number, AvailabilityStatus> = {};
        normalized.forEach((h) => (initial[h.id] = "unknown"));
        setAvailabilityMap(initial);

        setError(null);
      } catch (e) {
        console.error(e);
        setError("❌ Cannot load hotels from database. Check backend route /api/hotels.");
      } finally {
        setLoading(false);
      }
    };

    loadHotels();
  }, []);

  // Reset availability when selection changes
  useEffect(() => {
    if (!hotels.length) return;
    const reset: Record<number, AvailabilityStatus> = {};
    hotels.forEach((h) => (reset[h.id] = "unknown"));
    setAvailabilityMap(reset);
  }, [checkIn, checkOut, rooms, hotels]);

  // check availability for ONE hotel
  const checkOneHotelAvailability = async (hotelId: number): Promise<AvailabilityStatus> => {
    const res = await fetch(`${API}/api/availability/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotelId,
        checkIn,
        checkOut,
        rooms: Number(rooms),
      }),
    });

    let data: any = {};
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    const isAvailable = Boolean(data.isAvailable);
    return res.ok && isAvailable ? "available" : "unavailable";
  };

  // Check availability for ALL hotels
  const handleCheckAvailability = async () => {
    if (!isFormFilled) {
      alert("⚠️ Please fill Check-in, Check-out and Rooms first.");
      return;
    }
    if (!isDateValid) {
      alert("⚠️ Check-out date must be after Check-in date.");
      return;
    }

    try {
      const results = await Promise.all(
        hotels.map(async (h) => {
          const status = await checkOneHotelAvailability(h.id);
          return { hotelId: h.id, status };
        })
      );

      const map: Record<number, AvailabilityStatus> = {};
      results.forEach((r) => (map[r.hotelId] = r.status));
      setAvailabilityMap(map);

      alert("✅ Availability checked!");
    } catch (err) {
      console.error(err);
      alert("❌ Availability check failed. Please ensure backend is running.");
    }
  };

  // Book Now: validate fields, auto-check if unknown
  const handleBookNowClick = async (hotelId: number) => {
    if (!isFormFilled) {
      alert("⚠️ Please fill Check-in, Check-out and Rooms first.");
      return;
    }
    if (!isDateValid) {
      alert("⚠️ Check-out date must be after Check-in date.");
      return;
    }

    let status = availabilityMap[hotelId] ?? "unknown";

    if (status === "unknown") {
      try {
        status = await checkOneHotelAvailability(hotelId);
        setAvailabilityMap((prev) => ({ ...prev, [hotelId]: status }));
      } catch (e) {
        console.error(e);
        alert("❌ Availability check failed. Try again.");
        return;
      }
    }

    if (status === "unavailable") {
      alert("❌ No rooms available for selected dates.");
      return;
    }

    navigate(`/room-booking?hotelId=${hotelId}&checkIn=${checkIn}&checkOut=${checkOut}&rooms=${rooms}`);
  };

  const onViewDetails = (id: number) => {
    const found = hotels.find((h) => h.id === id) || null;
    setSelectedHotel(found);
    setShowModal(true);
  };

  if (loading) return <div style={{ padding: 40 }}>Loading hotels...</div>;
  if (error) return <div style={{ padding: 40, color: "red" }}>{error}</div>;

  return (
    <div className="branchbook-wrapper">
      <div className="hero" style={{ backgroundImage: `url('/Images/HD.jpg')` }}>
        <div className="hero-overlay">
          <div className="booking-card">
            <div className="booking-row">
              <div>
                <label>Check-in</label>
                <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
              </div>

              <div>
                <label>Check-out</label>
                <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
              </div>

              <div>
                <label>Rooms</label>
                <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
                  <option value="1">1 room</option>
                  <option value="2">2 rooms</option>
                  <option value="3">3 rooms</option>
                  <option value="4">4 rooms</option>
                  <option value="5">5 rooms</option>
                </select>
              </div>

              <div className="checkrates-wrap">
                <button className="checkrates-btn" onClick={handleCheckAvailability} type="button">
                  Check Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about">
        <h2>About the Hotel</h2>
        <p>
          Nova Vista Hotels is a growing chain in Northern Sri Lanka with
          branches in Jaffna, Kilinochchi, and Mannar. Known for blending
          cultural authenticity with modern comforts, Nova Vista provides elegant
          stays and versatile event spaces. With its focus on innovation and
          sustainability, the brand is embracing a centralized Hotel & Event
          Management System to deliver seamless service and unforgettable guest
          experiences across all branches.
        </p>
      </section>

      <section className="branches">
        <h2>Our Branches</h2>

        <div className="branches-grid">
          {hotels.map((h) => (
            <BranchCard
              key={h.id}
              id={h.id}
              name={h.name}
              location={h.location}
              images={h.images}
              rating={h.rating}
              short_desc={h.description}
              onViewDetails={onViewDetails}
              onBookNowClick={handleBookNowClick}
              availabilityStatus={availabilityMap[h.id] || "unknown"}
            />
          ))}
        </div>
      </section>

      {showModal && selectedHotel && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)} type="button">
              ×
            </button>

            <div className="modal-body">
              <div className="modal-images">
                {selectedHotel.images.map((img, idx) => (
                  <img key={idx} src={img} alt={`${selectedHotel.name} ${idx + 1}`} />
                ))}
              </div>

              <div className="modal-info">
                <h3>{selectedHotel.name}</h3>
                <p className="loc">{selectedHotel.location}</p>
                <p>{selectedHotel.description}</p>
                <p>
                  <strong>Rating:</strong> ⭐ {selectedHotel.rating.toFixed(1)}
                </p>
                <p>
                  <strong>Price / night:</strong> LKR {selectedHotel.price_per_night}
                </p>

                <div style={{ marginTop: 12 }}>
                  <button
                    type="button"
                    className={`book-now-btn ${availabilityMap[selectedHotel.id] === "unavailable" ? "disabled" : ""}`}
                    disabled={availabilityMap[selectedHotel.id] === "unavailable"}
                    onClick={() => handleBookNowClick(selectedHotel.id)}
                  >
                    {availabilityMap[selectedHotel.id] === "unavailable" ? "Not Available" : "Book Now"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchBook;
