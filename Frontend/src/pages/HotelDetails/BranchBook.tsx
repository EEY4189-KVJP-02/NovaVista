import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
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
  address?: string;
  phone?: string;
  email?: string;
  amenities?: string[];
  numberOfRooms?: number;
};

const BranchBook: React.FC = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Debug: Check if modal is in DOM
  useEffect(() => {
    if (showModal) {
      const checkModal = setInterval(() => {
        const modal = document.querySelector('.modal-backdrop');
        console.log('Modal in DOM:', modal !== null);
        if (modal) {
          console.log('Modal styles:', window.getComputedStyle(modal));
        }
      }, 100);
      return () => clearInterval(checkModal);
    }
  }, [showModal]);

  useEffect(() => {
    // fetch hotels from backend
    fetch("http://localhost:5000/api/hotels")
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        console.log("Hotels loaded from API:", data);
        setHotels(data);
      })
      .catch((err) => {
        console.warn("Could not load hotels from API, using fallback data:", err);
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
            address: "123 Main Street, Jaffna",
            phone: "+94 21 222 5434",
            email: "jaffna@novavistahotel.com",
            amenities: ["Free Wi-Fi", "Parking", "Air Conditioning", "Swimming Pool", "Event Hall"],
          },
          {
            id: 2,
            name: "Nova Vista – Kilinochchi",
            location: "Kilinochchi, Sri Lanka",
            description: "Modern facilities, great events hall.",
            rating: 4.6,
            image_url: "/Images/kilinochchi.jpg",
            price_per_night: 4200,
            address: "456 Central Road, Kilinochchi",
            phone: "+94 21 222 5434",
            email: "kilinochchi@novavistahotel.com",
            amenities: ["Free Wi-Fi", "Parking", "Air Conditioning", "Swimming Pool", "Event Hall"],
          },
          {
            id: 3,
            name: "Nova Vista – Mannar",
            location: "Mannar, Sri Lanka",
            description: "Seaside comfort with welcoming staff.",
            rating: 4.8,
            image_url: "/Images/mannar.jpg",
            price_per_night: 4600,
            address: "789 Beach Road, Mannar",
            phone: "+94 21 222 5434",
            email: "mannar@novavistahotel.com",
            amenities: ["Free Wi-Fi", "Parking", "Air Conditioning", "Swimming Pool", "Event Hall"],
          },
        ]);
      });
  }, []);

  const onViewDetails = async (id: number) => {
    console.log('View Details clicked for hotel ID:', id);
    
    // Find the hotel locally first
    const found = hotels.find((h) => h.id === id) || null;
    if (!found) {
      console.error('Hotel not found with ID:', id);
      return;
    }

    // Get the branch name from location
    const branchName = found.location.includes('Jaffna') ? 'Jaffna' :
                      found.location.includes('Kilinochchi') ? 'Kilinochchi' :
                      found.location.includes('Mannar') ? 'Mannar' : null;

    // Fetch number of rooms for this branch
    let numberOfRooms = 0;
    if (branchName) {
      try {
        const roomsResponse = await fetch(`http://localhost:3001/api/rooms?branch=${branchName}`);
        if (roomsResponse.ok) {
          const roomsData = await roomsResponse.json();
          numberOfRooms = Array.isArray(roomsData) ? roomsData.length : 0;
        }
      } catch (err) {
        console.error('Error fetching rooms count:', err);
        // Default to a sample number if API fails
        numberOfRooms = 10;
      }
    } else {
      // Default if branch name not found
      numberOfRooms = 10;
    }

    // Set hotel with room count
    const hotelWithRooms = {
      ...found,
      numberOfRooms: numberOfRooms || 10, // Default to 10 if fetch fails
    };
    
    console.log('Setting selected hotel:', hotelWithRooms);
    setSelectedHotel(hotelWithRooms);
    setShowModal(true);
    console.log('Modal should be visible now');
  };

  const handleBookNow = (hotelId: number, locationName: string) => {
    // Navigate to room booking page with location only
    const params = new URLSearchParams({
      location: locationName,
    });
    navigate(`/room-booking?${params.toString()}`);
  };

  return (
    <div className="branchbook-wrapper">
      <div className="hero" style={{ backgroundImage: `url('/Images/HD.jpg')` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Nova Vista Hotels</h1>
            <p className="hero-subtitle">Discover Our Premium Locations</p>
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
        <h2>Locations</h2>
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
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      </section>

      {/* Modal - Using Portal to render at root level */}
      {showModal && selectedHotel && createPortal(
        <div 
          className="modal-backdrop" 
          onClick={() => setShowModal(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
        >
          <div 
            className="modal" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              width: '90%',
              maxWidth: '900px',
              maxHeight: '90vh',
              overflowY: 'auto',
              position: 'relative',
              zIndex: 100000
            }}
          >
            <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            <div className="modal-body">
              <img src={selectedHotel.image_url} alt={selectedHotel.name} />
              <div className="modal-info">
                <h3>{selectedHotel.name}</h3>
                <p className="loc">{selectedHotel.location}</p>
                <p className="description">{selectedHotel.description}</p>
                
                {/* Common Details for All Locations */}
                <div className="modal-details">
                  <h4>Location Information</h4>
                  
                  <div className="detail-item">
                    <strong>Name:</strong> {selectedHotel.name}
                  </div>
                  
                  {selectedHotel.address && (
                    <div className="detail-item">
                      <strong>Address:</strong> {selectedHotel.address}
                    </div>
                  )}
                  
                  {selectedHotel.numberOfRooms !== undefined && (
                    <div className="detail-item">
                      <strong>Number of Rooms:</strong> {selectedHotel.numberOfRooms}
                    </div>
                  )}
                  
                  <div className="detail-item">
                    <strong>Rating:</strong> ⭐ {selectedHotel.rating.toFixed(1)} / 5.0
                  </div>
                  
                  {selectedHotel.phone && (
                    <div className="detail-item">
                      <strong>Contact Number:</strong> <a href={`tel:${selectedHotel.phone}`}>{selectedHotel.phone}</a>
                    </div>
                  )}
                  
                  {selectedHotel.email && (
                    <div className="detail-item">
                      <strong>Email:</strong> <a href={`mailto:${selectedHotel.email}`}>{selectedHotel.email}</a>
                    </div>
                  )}
                  
                  {selectedHotel.amenities && selectedHotel.amenities.length > 0 && (
                    <div className="amenities-section">
                      <h4>Amenities</h4>
                      <ul className="amenities-list">
                        {selectedHotel.amenities.map((amenity, index) => (
                          <li key={index}>{amenity}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="book-now-btn" 
                    onClick={() => {
                      setShowModal(false);
                      handleBookNow(selectedHotel.id, selectedHotel.location);
                    }}
                  >
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};

export default BranchBook;

