import React, { useEffect, useState } from "react";
import BranchCard from "../../../src/pages/HotelDetails/BranchCard";
import "./BranchBook.css";

type Hotel = {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  image_url: string;
  price_per_night?: number;
};

const BranchBook: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState("1");
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // fetch hotels from backend
    fetch("http://localhost:5000/api/hotels")
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => {
        console.error("Could not load hotels:", err);
        // fallback: local sample if backend not running
        setHotels([
          {
            id: 1,
            name: "Nova Vista – Jaffna",
            location: "Jaffna, Sri Lanka",
            description: "Comfortable stay in the heart of Jaffna.",
            rating: 4.7,
            image_url: "/Images/jaffna.jpg",
            price_per_night: 4500,
          },
          {
            id: 2,
            name: "Nova Vista – Kilinochchi",
            location: "Kilinochchi, Sri Lanka",
            description: "Modern facilities, great events hall.",
            rating: 4.6,
            image_url: "/Images/kilinochchi.jpg",
            price_per_night: 4200,
          },
          {
            id: 3,
            name: "Nova Vista – Mannar",
            location: "Mannar, Sri Lanka",
            description: "Seaside comfort with welcoming staff.",
            rating: 4.8,
            image_url: "/Images/mannar.jpg",
            price_per_night: 4600,
          },
        ]);
      });
  }, []);

  const onViewDetails = (id: number) => {
    // try to fetch single hotel details from backend
    fetch(`http://localhost:5000/api/hotels/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedHotel(data);
        setShowModal(true);
      })
      .catch(() => {
        // fallback: find locally
        const found = hotels.find((h) => h.id === id) || null;
        setSelectedHotel(found);
        setShowModal(true);
      });
  };

  const handleCheckRates = () => {
    // simple validation
    if (!checkIn || !checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }
    // For now, show a simple message — booking page will handle actual booking
    alert(`Checking rates for ${rooms} room(s)\nFrom: ${checkIn}\nTo: ${checkOut}`);
  };

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
                </select>
              </div>
              <div className="checkrates-wrap">
                <button className="checkrates-btn" onClick={handleCheckRates}>Check Rates</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="about">
        <h2>About the Hotel</h2>
        <p>
          Nova Vista Hotels is a growing chain in Northern Sri Lanka with
          branches in Jaffna, Kilinochchi, and Mannar. Known for blending
          cultural authenticity with modern comforts, Nova Vista provides elegant
          stays and versatile event spaces. With its focus on innovation and
          sustainability, the brand is embracing a centralized Hotel & Event
          Management System to deliver seamless service and unforgettable guest
          experiences across all its branches.
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
              image={h.image_url}
              rating={h.rating}
              short_desc={h.description}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </section>

      {/* Modal */}
      {showModal && selectedHotel && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <div className="modal-body">
              <img src={selectedHotel.image_url} alt={selectedHotel.name} />
              <div className="modal-info">
                <h3>{selectedHotel.name}</h3>
                <p className="loc">{selectedHotel.location}</p>
                <p>{selectedHotel.description}</p>
                <p><strong>Price / night:</strong> LKR {selectedHotel.price_per_night ?? "—"}</p>
                <div className="modal-actions">
                  <a className="book-now-btn" href={`/book/${selectedHotel.id}`}>Book Now</a>
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

