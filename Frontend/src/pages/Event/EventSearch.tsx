import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiService, EventHall } from "../../services/EventSearch";

const EventSearch = () => {
  const [location, setLocation] = useState<string>("");
  const [seating, setSeating] = useState<string>("");
  const [guestRange, setGuestRange] = useState<number | null>(null);
  const [availabilityDate, setAvailabilityDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [halls, setHalls] = useState<EventHall[]>([]);
  const [filteredHalls, setFilteredHalls] = useState<EventHall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    location: false,
    seating: false,
    date: false,
    time: false,
    guests: false,
  });

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

 
  const guestRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 500 },
    { min: 501, max: 800 },
  ];

  const handleSearch = async () => {
    setShowNoResults(true);
    const newErrors = {
      location: !location,
      seating: !seating,
      date: !availabilityDate,
      time: !timeSlot,
      guests: guestRange === null,
    };

    setErrors(newErrors);

    if (
      newErrors.location ||
      newErrors.seating ||
      newErrors.date ||
      newErrors.time ||
      newErrors.guests
    ) {
      return;
    }
    const rangeIndex = guestRange !== null ? guestRange : null;

    const filters: {
      location?: string;
      seating?: string;
      minCapacity?: number;
      maxCapacity?: number;
      eventDate?: string;
      timeSlot?: string;
    } = {};

    if (location) filters.location = location;
    if (seating) filters.seating = seating;
    if (rangeIndex !== null) {
      filters.minCapacity = guestRanges[rangeIndex].min;
      filters.maxCapacity = guestRanges[rangeIndex].max;
    }
    if (availabilityDate) filters.eventDate = availabilityDate;
    if (timeSlot) filters.timeSlot = timeSlot;

    try {
      setLoading(true);
      const data = await apiService.fetchEventHalls(filters);

      const availableHalls = data.filter((hall) => {
        return hall.hall_availabilities.length === 0;
      });
      setFilteredHalls(availableHalls);
      setError(null);
    } catch (err) {
      setError("Failed to fetch event halls");
    } finally {
      setLoading(false);
    }
  };

  const [showNoResults, setShowNoResults] = useState(true);

  return (
    <div style={{ margin: "2.5rem 3rem" }}>
      <div
        className="w-20 h-10 position-absolute d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#fff",
          top: "80vh",
          left: "20%",
          borderRadius: "10px",
          border: "1px solid #ccc",
          height: "5rem",
          gap: "20px",
          padding: "20px 10px",
        }}
      >
        <div>
          <select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setErrors((prev) => ({ ...prev, location: false }));
            }}
            className={`form-select ${errors.location ? "is-invalid" : ""}`}
            style={{ width: "150px" }}
          >
            <option value="">Location</option>
            <option value="Jaffna">Jaffna</option>
            <option value="Kilinochchi">Kilinochchi</option>
            <option value="Mannar">Mannar</option>
          </select>

          {errors.location && (
            <div className="invalid-feedback">Please select a location</div>
          )}
        </div>
        <div>
          <select
            value={seating}
            onChange={(e) => {
              setSeating(e.target.value);
              setErrors((prev) => ({ ...prev, seating: false }));
            }}
            className={`form-select ${errors.seating ? "is-invalid" : ""}`}
            style={{ width: "150px" }}
          >
            <option value="">Seating Style</option>
            <option value="Boardroom">Boardroom</option>
            <option value="Circular">Circular</option>
            <option value="Theater">Theater</option>
            <option value="U-Shaped">U-Shaped</option>
          </select>

          {errors.seating && (
            <div className="invalid-feedback">Please select seating style</div>
          )}
        </div>
        <div>
          <input
            type="date"
            value={availabilityDate}
            onChange={(e) => {
              setAvailabilityDate(e.target.value);
              setErrors((prev) => ({ ...prev, date: false }));
            }}
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            style={{ width: "150px" }}
          />

          {errors.date && (
            <div className="invalid-feedback">Please select event date</div>
          )}
        </div>
        <div>
          <select
            value={timeSlot}
            onChange={(e) => {
              setTimeSlot(e.target.value);
              setErrors((prev) => ({ ...prev, time: false }));
            }}
            className={`form-select ${errors.time ? "is-invalid" : ""}`}
            style={{ width: "150px" }}
          >
            <option value="">Time Slot</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Full Day">Full Day</option>
          </select>

          {errors.time && (
            <div className="invalid-feedback">Please select time slot</div>
          )}
        </div>
        <div>
          <select
            value={guestRange === null ? "" : guestRange}
            onChange={(e) => {
              const value =
                e.target.value === "" ? null : Number(e.target.value);
              setGuestRange(value);
              setErrors((prev) => ({ ...prev, guests: false }));
            }}
            className={`form-select ${errors.guests ? "is-invalid" : ""}`}
            style={{ width: "150px" }}
          >
            <option value="">Guests</option>
            <option value="0">0 - 100</option>
            <option value="1">101 - 200</option>
            <option value="2">201 - 500</option>
            <option value="3">501 - 800</option>
          </select>

          {errors.guests && (
            <div className="invalid-feedback">Please select guest range</div>
          )}
        </div>
        <button
          onClick={handleSearch}
          type="submit"
          className="btn-primary"
          style={{ padding: "10px", width: "120px", borderRadius: "10px" }}
        >
          Search
        </button>
      </div>

      {!loading && !error && filteredHalls.length === 0 && showNoResults && (
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
                <div className="mb-3" style={{ display: "flex", justifyContent: "center" }}>
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
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowNoResults(false)}
                  style={{ border: "1px solid #222", padding: "6px" }}
                ></button>
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
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setLocation("");
                    setSeating("");
                    setAvailabilityDate("");
                    setTimeSlot("");
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

      <div
        className="row "
        style={{ gap: "20px", maxWidth: "1300px", margin: "0 auto" }}
      >
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
            return (
              <HallCard
                key={hall.id}
                hall={hall}
                eventDate={availabilityDate}
                timeSlot={timeSlot}
              />
            );
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
          // start icon
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

interface HallCardProps {
  hall: EventHall;
  eventDate: string;
  timeSlot: string;
}

const HallCard = ({ hall, eventDate, timeSlot }: HallCardProps) => {
  const navigate = useNavigate();
  const [validationMsg, setValidationMsg] = useState("");
  const handleView = () => {
    if (!eventDate || !timeSlot) {
      setValidationMsg("Please select an availability date and time.");
      setTimeout(() => {
        setValidationMsg("");
      }, 1000);
      return;
    }

    setValidationMsg("");
    // navigate("/event-booking");
    navigate(`/event-booking?date=${eventDate}&time=${timeSlot}`);
  };

  return (
    <div
      className="card mb-4 shadow-sm col-4  col-md-4 col-sm-6 p-0"
      key={hall.id}
      style={{ maxWidth: "300px", borderRadius: "15px" }}
    >
      <div className="column ">
        <div className="position-relative">
          <img
            src={`/Images/${hall.image}`}
            className="w-100"
            alt={hall.name}
            style={{
              objectFit: "cover",
              borderRadius: "12px 12px 0px 0px",
              height: "200px",
            }}
          />

          <button
            onClick={handleView}
            className="btn-primary position-absolute bottom-0 end-0 m-2 "
            style={{
              padding: "2px",
              width: "60px",
              borderRadius: "10px",
            }}
          >
            View
            {validationMsg && (
              <div
                className="alert alert-warning mt-2"
                role="alert"
                style={{
                  position: "absolute",
                  bottom: "10px",
                  right: "0",
                  minWidth: "250px",
                  textAlign: "left",
                }}
              >
                {validationMsg}
              </div>
            )}
          </button>
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
