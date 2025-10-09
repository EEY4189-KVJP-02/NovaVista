import React, { useState } from "react";
import halls from "./Event.json";
import { Link } from "react-router-dom";

const EventSearch = () => {
  const [location, setLocation] = useState<string>("");
  const [seating, setSeating] = useState<string>("");
  const [guestRange, setGuestRange] = useState<number | null>(null);
  const [filteredHalls, setFilteredHalls] = useState(halls);

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
          value={guestRange ===null? "":guestRange}
          onChange={(e) => setGuestRange(e.target.value===""?null:Number(e.target.value))}
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

      {/* Filtered Results */}
      <div className="row " style={{ gap: "20px" }}>
        {filteredHalls.length > 0 ? (
          filteredHalls.map((hall) => <HallCard key={hall.id} hall={hall} />)
        ) : (
          <p>No halls found.</p>
        )}
      </div>
    </div>
  );
};

export default EventSearch;

const HallCard = ({
  hall,
}: {
  hall: {
    id: number;
    name: string;
    location: string;
    description?: string;
    image?: string;
  };
}) => {
  return (
    <div
      className="card mb-4 shadow-sm col-4  col-md-4 col-sm-6 p-0"
      key={hall.id}
      style={{ maxWidth: "300px", borderRadius: "15px" }}
    >
      <div className="column ">
        <div className="position-relative">
          <img
            src={"/Images/event_hero3.jpg"}
            className="w-100"
            alt={hall.location}
            style={{
              objectFit: "cover",
              borderRadius: "12px 12px 0px 0px",
            }}
          />
          <Link to="">
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
              <h4 className="card-title fw-bold">GRAND BALLROOM</h4>
              <p className="card-text mb-3">
                A stately affair with adjoining lawns, the Grand Ballroom spans
                an area of 630 square metres for your guests to relax and mingle
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-text">Jaffna</h5>
              <div className="d-flex" style={{ gap: "10px" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="yellow"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="yellow"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="yellow"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="yellow"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="yellow"
                  className="bi bi-star-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
