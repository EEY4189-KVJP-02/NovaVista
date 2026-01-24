import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../../services/Auth";
import "./EventForm.css";

const API_BASE_URL = 'http://localhost:5000/api';

export default function EventForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get values from URL params (from event search page)
  const hallIdFromUrl = searchParams.get('hallId');
  const locationFromUrl = searchParams.get('location');
  const dateFromUrl = searchParams.get('date');
  const guestsFromUrl = searchParams.get('guests');
  
  const [eventDate, setEventDate] = useState(dateFromUrl || "");
  const [guests, setGuests] = useState<number | "">(guestsFromUrl ? Number(guestsFromUrl) : "");
  const [hall, setHall] = useState(hallIdFromUrl || "");
  const [eventName, setEventName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    setError("");
    
    if (!terms) {
      setError("Please accept the terms and conditions");
      return;
    }
    
    if (!eventDate || guests === "" || !hall || hall === "" || !eventName || !contactName || !contactEmail || !contactPhone) {
      setError("Please fill in all required fields");
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    // Check if user is logged in
    const token = authService.getToken();
    if (!token) {
      const currentUrl = window.location.pathname + window.location.search;
      navigate(`/login?returnUrl=${encodeURIComponent(currentUrl)}`);
      return;
    }

    setLoading(true);
    try {
      const hallId = parseInt(hall);
      
      if (isNaN(hallId) || hallId <= 0) {
        setError("Please select a valid hall");
        setLoading(false);
        return;
      }
      
      const response = await fetch(`${API_BASE_URL}/event-bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          hallId,
          eventName: eventName.trim(),
          contactName: contactName.trim(),
          contactEmail: contactEmail.trim(),
          contactPhone: contactPhone.trim(),
          eventDate,
          numberOfGuests: Number(guests),
          specialRequests: specialRequests.trim() || null,
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to create booking';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      alert(data.message || "Event booking created successfully!");
      // Reset form
      setEventDate("");
      setGuests("");
      setHall("");
      setEventName("");
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setSpecialRequests("");
      setTerms(false);
      setError("");
    } catch (err: any) {
      console.error('Booking error:', err);
      if (err.message && err.message.includes('Failed to fetch')) {
        setError("Cannot connect to server. Please make sure the backend server is running on port 5000.");
      } else {
        setError(err.message || "Failed to create booking. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const [halls, setHalls] = useState<Array<{ id: number; name: string; location: string }>>([]);
  const [location, setLocation] = useState<string>(locationFromUrl || "Jaffna");

  // Fetch halls from API
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const currentLocation = locationFromUrl || location;
        const response = await fetch(`${API_BASE_URL}/halls?location=${currentLocation}`);
        if (response.ok) {
          const data = await response.json();
          setHalls(data);
        } else {
          // Fallback to default halls if API fails
          setHalls([
            { id: 1, name: "Boardroom", location: "Jaffna" },
            { id: 2, name: "Hall", location: "Jaffna" },
            { id: 3, name: "Theater", location: "Jaffna" },
            { id: 4, name: "U-shaped", location: "Jaffna" },
            { id: 5, name: "Circular", location: "Jaffna" },
          ]);
        }
      } catch (error) {
        console.error('Error fetching halls:', error);
        // Fallback to default halls
        setHalls([
          { id: 1, name: "Boardroom", location: "Jaffna" },
          { id: 2, name: "Hall", location: "Jaffna" },
          { id: 3, name: "Theater", location: "Jaffna" },
          { id: 4, name: "U-shaped", location: "Jaffna" },
          { id: 5, name: "Circular", location: "Jaffna" },
        ]);
      }
    };
    fetchHalls();
  }, [location, locationFromUrl]);
  
  // Update location when URL param changes
  useEffect(() => {
    if (locationFromUrl) {
      setLocation(locationFromUrl);
    }
  }, [locationFromUrl]);

  // Generate guest options - include the value from URL if it's not in the standard list
  const standardGuestOptions = [...Array(10)].map((_, i) => (i + 1) * 100);
  const guestFromUrlNum = guestsFromUrl ? Number(guestsFromUrl) : 0;
  const guestOptions = guestFromUrlNum > 0 && !standardGuestOptions.includes(guestFromUrlNum)
    ? [guestFromUrlNum, ...standardGuestOptions].sort((a, b) => a - b)
    : standardGuestOptions;

  return (
    <div className="container mt-5">
      <h1>Event Booking</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label>Event Name <span className="text-danger">*</span></label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            placeholder="e.g., Annual Conference"
            required
          />
        </div>

        <div className="form-group">
          <label>Event Date <span className="text-danger">*</span></label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
            disabled={!!dateFromUrl}
            style={dateFromUrl ? { backgroundColor: '#f8f9fa', cursor: 'not-allowed' } : {}}
          />
          {dateFromUrl && <small className="text-muted d-block mt-1">Pre-filled from search</small>}
        </div>

        <div className="form-group">
          <label>No. of Guests <span className="text-danger">*</span></label>
          <select
            value={guests === "" ? "" : guests}
            onChange={(e) => setGuests(e.target.value === "" ? "" : Number(e.target.value))}
            required
            disabled={!!guestsFromUrl}
            style={guestsFromUrl ? { backgroundColor: '#f8f9fa', cursor: 'not-allowed' } : {}}
          >
            <option value="">Select number of guests</option>
            {guestOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          {guestsFromUrl && <small className="text-muted d-block mt-1">Pre-filled from search</small>}
        </div>

        <div className="form-group">
          <label>Location <span className="text-danger">*</span></label>
          <select 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required
            disabled={!!locationFromUrl}
            style={locationFromUrl ? { backgroundColor: '#f8f9fa', cursor: 'not-allowed' } : {}}
          >
            <option value="Jaffna">Jaffna</option>
            <option value="Kilinochchi">Kilinochchi</option>
            <option value="Mannar">Mannar</option>
          </select>
          {locationFromUrl && <small className="text-muted d-block mt-1">Pre-filled from search</small>}
        </div>

        <div className="form-group">
          <label>Hall Type <span className="text-danger">*</span></label>
          <select 
            value={hall || ""} 
            onChange={(e) => setHall(e.target.value)} 
            required
            disabled={!!hallIdFromUrl}
            style={hallIdFromUrl ? { backgroundColor: '#f8f9fa', cursor: 'not-allowed' } : {}}
          >
            <option value="">Select a hall</option>
            {halls.map((h) => (
              <option key={h.id} value={h.id}>
                {h.name} ({h.location})
              </option>
            ))}
          </select>
          {hallIdFromUrl && <small className="text-muted d-block mt-1">Pre-filled from search</small>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Contact Name <span className="text-danger">*</span></label>
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Your full name"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Email <span className="text-danger">*</span></label>
          <input
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            placeholder="your.email@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Phone <span className="text-danger">*</span></label>
          <input
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="+94 77 123 4567"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Special Requests (Optional)</label>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Any special requirements or requests..."
          rows={3}
        />
      </div>

      <Form.Check
        type="checkbox"
        label="Accept Terms & Conditions"
        className="form-check mt-3"
        checked={terms}
        onChange={(e) => setTerms(e.target.checked)}
      />

      <Button 
        variant="success" 
        className="book-button" 
        onClick={handleBook}
        disabled={loading}
      >
        {loading ? "Processing..." : "BOOK"}
      </Button>
    </div>
  );
}
