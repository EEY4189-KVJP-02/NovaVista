import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiService, EventHall } from "../../services/EventSearch";

const EventSearch = () => {
  const [location, setLocation] = useState<string>("");
  const [seating, setSeating] = useState<string>("");
  const [guestRange, setGuestRange] = useState<number | null>(null);
  const [halls, setHalls] = useState<EventHall[]>([]);
  const [filteredHalls, setFilteredHalls] = useState<EventHall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        setLoading(true);

        const data = await apiService.fetchEventHalls();
        setHalls(data);
        setFilteredHalls(data);

        setError(null);
      } catch (err) {
        setError("Failed to fetch event halls");
      } finally {
        setLoading(false);
      }
    };

    fetchHalls();
  }, []);

  // guest ranges
  const guestRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 500 },
    { min: 501, max: 800 },
  ];

  const handleSearch = () => {
    const rangeIndex = guestRange !== null ? guestRange : null;

    const results = halls.filter((hall) => {
      const matchLocation = location ? hall.location === location : true;
      const matchSeating = seating ? hall.seating === seating : true;

      const matchGuests =
        rangeIndex !== null
          ? hall.capacity >= guestRanges[rangeIndex].min &&
            hall.capacity <= guestRanges[rangeIndex].max
          : true;

      return matchLocation && matchSeating && matchGuests;
    });

    setFilteredHalls(results);
  };

  return (
    <div style={{ margin: "2.5rem 3rem" }}>
      {/* Search Bar   */}
      <div
        className="w-20 h-10 position-absolute d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#fff",
          top: "60vh",
          left: "10%",
          borderRadius: "10px",
          border: "1px solid #ccc",
          height: "5rem",
          gap: "20px",
          padding: "20px 10px",
        }}
      >
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="form-select"
          style={{
            border: "1px solid #ccc",
            height: "fit-content",
            padding: "15px",
            width: "200px",
          }}
        >
          {" "}
          <label>Works with selects</label>
          <option selected>Location</option>
          <option value="Jaffna">Jaffna</option>
          <option value="Kilinochchi">Kilinochchi</option>
          <option value="Mannar">Mannar</option>
        </select>
        <select
          value={seating}
          onChange={(e) => setSeating(e.target.value)}
          className="form-select"
          style={{
            border: "1px solid #ccc",
            height: "fit-content",
            padding: "15px",
            width: "200px",
          }}
        >
          <option selected>Boardroom</option>
          <option value="Circular">Circular</option>
          <option value="Theater">Theater</option>
          <option value="U-Shaped">U-Shaped</option>
        </select>
        <select
          value={guestRange === null ? "" : guestRange}
          onChange={(e) =>
            setGuestRange(e.target.value === "" ? null : Number(e.target.value))
          }
          className="form-select"
          style={{
            border: "1px solid #ccc",
            height: "fit-content",
            padding: "15px",
            width: "200px",
          }}
        >
          <option value="">Guests</option>
          <option value="0">0 - 100</option>
          <option value="1">101 - 200</option>
          <option value="2">201 - 500</option>
          <option value="3">501 - 800</option>
        </select>
        <button
          onClick={handleSearch}
          type="submit"
          className="btn-primary"
          style={{ padding: "15px", width: "120px", borderRadius: "10px" }}
        >
          Search
        </button>
      </div>

      {/* No Results Popup  */}
      {!loading && !error && filteredHalls.length === 0 && (
        <div
          className="position-fixed d-flex justify-content-center align-items-center"
          style={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: "400px",
              width: "90%",
              borderRadius: "20px",
              border: "none",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              backgroundColor: "#fff",
            }}
          >
            <div className="card-body text-center p-4">
              <div className="mb-3">
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#ff6b6b",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="white"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>

              <h4
                className="card-title mb-3"
                style={{ color: "#333", fontWeight: "bold" }}
              >
                No Event Halls Found
              </h4>

              <p className="card-text mb-3" style={{ color: "#666" }}>
                We couldn't find any halls matching your search criteria.
              </p>

              <div
                className="mb-4 p-3"
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "10px",
                  border: "1px solid #e9ecef",
                }}
              >
                <small style={{ color: "#666" }}>
                  <strong>Current filters:</strong>
                  <br />
                  {location && `Location: ${location}`}
                  {seating && ` | Seating: ${seating}`}
                  {guestRange !== null &&
                    ` | Guests: ${guestRanges[guestRange].min}-${guestRanges[guestRange].max}`}
                  {!location &&
                    !seating &&
                    guestRange === null &&
                    "No filters applied"}
                </small>
              </div>

              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setLocation("");
                    setSeating("");
                    setGuestRange(null);
                    if (Array.isArray(halls)) {
                      setFilteredHalls(halls);
                    }
                  }}
                  style={{
                    padding: "10px 30px",
                    borderRadius: "25px",
                    fontSize: "1rem",
                    fontWeight: "500",
                  }}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtered Results */}
      <div className="row " style={{ gap: "20px" }}>
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        ) : filteredHalls.length > 0 ? (
          filteredHalls.map((hall) => {
            return <HallCard key={hall.id} hall={hall} />;
          })
        ) : null}
      </div>
    </div>
  );
};

export default EventSearch;

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="d-flex" style={{ gap: "2px" }}>
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill={index < rating ? "yellow" : "#ddd"}
          className="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      ))}
    </div>
  );
};

const HallCard = ({ hall }: { hall: EventHall }) => {
  return (
    <div
      className="card mb-4 shadow-sm col-4  col-md-4 col-sm-6 p-0"
      key={hall.id}
      style={{ maxWidth: "300px", borderRadius: "15px" }}
    >
      <div className="column ">
        <div className="position-relative">
          <img
            src={
              // hall.image ? `/Images/${hall.image}` : "/Images/event_hero3.jpg"
              "/Images/grand_ballroom.jpg"
            }
            className="w-100"
            alt={hall.name}
            style={{
              objectFit: "cover",
              borderRadius: "12px 12px 0px 0px",
              height: "200px",
            }}
          />
          <Link to="/event-booking">
            <button
              className="btn-primary position-absolute bottom-0 end-0 m-2 "
              style={{
                padding: "2px",
                width: "60px",
                borderRadius: "10px",
              }}
            >
              View
            </button>
          </Link>
        </div>

        <div>
          <div className="card-body h-100 d-flex flex-column">
            <div>
              <h4 className="card-title fw-bold">{hall.name}</h4>
              <p className="card-text mb-3">{hall.description}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-text">{hall.location}</h5>
              <StarRating rating={hall.rating || 5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
