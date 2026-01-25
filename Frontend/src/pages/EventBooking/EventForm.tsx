import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import "./EventForm.css";

export default function EventForm() {
  const [eventDate, setEventDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [budget, setBudget] = useState("");
  const [decoration, setDecoration] = useState("");
  const [catering, setCatering] = useState("");
  const [terms, setTerms] = useState(false);

  const handleBook = async () => {
    if (!terms) {
      alert("Please accept the terms");
      return;
    }

    if (!eventDate || !eventType || !timeSlot || !budget || !decoration || !catering) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const response = await axios.post("/api/book", {
        eventDate,
        eventType,
        timeSlot,
        budget,
        decoration,
        catering,
        terms,
      });
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const eventTypes = ["Wedding", "Birthday Party", "Conference", "Reception"];
  const timeSlots = ["Morning", "Evening", "Full Day"];
  const budgetRanges = [
    "LKR 50,000 - 100,000",
    "LKR 100,000 - 150,000",
    "LKR 150,000 - 200,000",
    "Above LKR 200,000",
  ];
  const decorationTypes = ["Basic", "Premium", "Luxury", "Custom"];
  const cateringOptions = [
    "Buffet",
    "Sit-down Meal",
    "Finger Food",
    "Vegetarian",
    "Non-Vegetarian",
    "Special Cuisine",
  ];

  return (
    <div className="container mt-5">
      <h1>Event Booking</h1>

      {/* Row 1 */}
      <div className="form-row">
        <div className="form-group">
          <label>Event Date</label>
          <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Event Type</label>
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="">Select Event Type</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Time Slot</label>
          <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}>
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 2 */}
      <div className="form-row">
        <div className="form-group">
          <label>Budget Range</label>
          <select value={budget} onChange={(e) => setBudget(e.target.value)}>
            <option value="">Select Budget</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Decoration Type</label>
          <select value={decoration} onChange={(e) => setDecoration(e.target.value)}>
            <option value="">Select Decoration</option>
            {decorationTypes.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Catering Options</label>
          <select value={catering} onChange={(e) => setCatering(e.target.value)}>
            <option value="">Select Catering</option>
            {cateringOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Terms */}
      <Form.Check
        type="checkbox"
        label="Accept Terms & Conditions"
        className="form-check mt-3"
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
      />

      {/* Buttons aligned right */}
      <div className="button-row">
        <Button className="book-button" onClick={handleBook}>
          Book Now
        </Button>
        <Button className="small-btn" onClick={() => {
          setEventDate(""); setEventType(""); setTimeSlot(""); setBudget(""); setDecoration(""); setCatering(""); setTerms(false);
        }}>
          Clear Form
        </Button>
      </div>
    </div>
  );
}
