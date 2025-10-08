import React, { useState } from "react";

const EventSearch = () => {
  const [location, setLocation] = useState("");
const [seating, setSeating] = useState("");
const [guests, setGuests] = useState("");

  return (
    <div
      className="w-20 h-10 position-absolute"
      style={{
        backgroundColor: "#fff",
        top: "60vh",
        left: "10%",
        borderRadius: "10px",
        border: "1px solid #ccc",
        // width: "fit-content",
        height: "5rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "20px 10px",
      }}
    >
      <select
        className="form-select"
        style={{
          border: "1px solid #ccc",
          height: "fit-content",
          padding: "15px",
          width: "200px",
        }}
      >  <label >Works with selects</label>
        <option selected>Location</option>
        <option value="1">Jaffna</option>
        <option value="2">Kilinochchi</option>
        <option value="3">Mannar</option>
      </select>
      <select
        className="form-select"
        style={{
          border: "1px solid #ccc",
          height: "fit-content",
          padding: "15px",
          width: "200px",
        }}
      >
        <option selected>Boardroom</option>
        <option value="1">Circular</option>
        <option value="2">Theater</option>
        <option value="3">U-Shaped</option>
      </select>
      <select
        className="form-select"
        aria-label="Default select example"
        style={{
          border: "1px solid #ccc",
          height: "fit-content",
          padding: "15px",
          width: "200px",
        }}
      >
        <option selected>Guest</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
      <button
        type="submit"
        className="btn-primary"
        style={{ padding: "15px", width: "120px", borderRadius: "10px" }}
      >
        Search
      </button>
    </div>
  );
};

export default EventSearch;
