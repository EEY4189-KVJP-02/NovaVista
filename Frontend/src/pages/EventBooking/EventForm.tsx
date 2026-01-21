import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./EventForm.css";

export default function EventForm() {
  const [eventDate, setEventDate] = useState("");
  const [guests, setGuests] = useState(Number);
  const [hall, setHall] = useState("");
  const [terms, setTerms] = useState(false);

  const handleBook = async () => {
    if (!terms) {
      alert("Please accept the terms");
      return;
    }
    if (!eventDate || !guests || !hall) {
      alert("Please select all fields");
      return;
    }
    try {
      const response = await axios.post("/api/book", {
        eventDate,
        guests,
        hall,
        terms,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const guestOptions = [...Array(10)].map((_, i) => (i + 1) * 100);
  const hallOptions = ["Hall 1", "Hall 2", "Hall 3"];

  return (
    <div className="container mt-5">
      <h1>Event Booking</h1>

      <div className="form-row">
        <div className="form-group">
          <label>Event Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>No. of Guests</label>
          <select
            value={guests || ""}
            onChange={(e) => setGuests(Number(e.target.value))}
          >
            {guestOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Halls</label>
          <select value={hall || ""} onChange={(e) => setHall(e.target.value)}>
            {hallOptions.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Form.Check
        type="checkbox"
        label="Accept Terms & Conditions"
        className="form-check"
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
      />

      <Button variant="success" className="book-button" onClick={handleBook}>
        Book Now
      </Button>
    </div>
  );
}
