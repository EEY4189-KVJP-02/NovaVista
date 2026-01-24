import React, { useEffect, useState } from "react";
import { roomBookingService, BookingData, Room } from "../../services/RoomBooking";
import "./RoomBookingForm.css";

interface RoomBookingFormProps {
  room: Room;
  checkInDate: string;
  checkOutDate: string;
  onBookingSuccess: () => void;
  onClose: () => void;
}

const RoomBookingForm: React.FC<RoomBookingFormProps> = ({
  room,
  checkInDate,
  checkOutDate,
  onBookingSuccess,
  onClose,
}) => {
  const [formData, setFormData] = useState<BookingData>({
    guestName: "",
    guestEmail: "",
    guestPhone: "",
    checkInDate,
    checkOutDate,
    numberOfGuests: 1,
    specialRequests: "",
  });

  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const calculateNights = () => {
      if (checkInDate && checkOutDate) {
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNights(diffDays);
        setTotalPrice(Number(room.price) * diffDays);
      }
    };

    calculateNights();
    checkAvailability();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkInDate, checkOutDate, room.id]);

  const checkAvailability = async () => {
    if (!checkInDate || !checkOutDate) return;

    setLoading(true);
    setError(null);

    // Calculate locally first
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNights(diffDays);
    setTotalPrice(Number(room.price) * diffDays);

    try {
      const availability = await roomBookingService.checkAvailability(room.id, checkInDate, checkOutDate);
      setIsAvailable(availability.isAvailable);
      if (availability.nights) setNights(availability.nights);
      if (availability.totalPrice) setTotalPrice(availability.totalPrice);
    } catch (err: any) {
      // If API fails, assume available but keep UI usable
      setIsAvailable(true);
      console.warn("Availability check failed, assuming available:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfGuests" ? parseInt(value, 10) || 1 : value,
    }));

    if (name === "numberOfGuests") {
      const guests = parseInt(value, 10) || 1;
      if (guests > room.maxGuests) setError(`Maximum ${room.maxGuests} guests allowed`);
      else setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!checkInDate || !checkOutDate) {
      setError("Please select check-in and check-out dates.");
      return;
    }

    if (formData.numberOfGuests > room.maxGuests) {
      setError(`Maximum ${room.maxGuests} guests allowed for this room`);
      return;
    }

    if (!isAvailable) {
      setError("Room is not available for the selected dates");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await roomBookingService.createBooking(room.id, {
        ...formData,
        checkInDate,
        checkOutDate,
      });

      console.log("Booking response:", response);
      setSuccess(true);
      setTimeout(() => {
        onBookingSuccess();
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error("Booking error:", err);
      if (err?.message?.includes("Room not found")) {
        setError("This room is not available in our system. Please select a different room.");
      } else if (err?.message?.includes("Cannot POST") || err?.message?.includes("HTTP error! status: 404")) {
        setError(
          "Room booking API endpoint was not found (404). Make sure the backend is running on port 5000 and the URL `http://localhost:5000/api/rooms/:id/book` is reachable."
        );
      } else if (err?.message?.includes("not available")) {
        setIsAvailable(false);
        setError("This room is not available for the selected dates. Please choose different dates.");
      } else {
        setError(err?.message || "Failed to create booking. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="booking-form-overlay">
        <div className="booking-form-container">
          <div className="booking-success">
            <h3>Booking Successful!</h3>
            <p>Your room booking has been recorded. You will receive a confirmation shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-form-overlay" onClick={onClose}>
      <div className="booking-form-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Book {room.type}</h2>
        <p className="text-muted">{room.branch} Branch</p>

        <div className="booking-summary mb-4">
          <div className="row">
            <div className="col-6">
              <strong>Check-in:</strong> {new Date(checkInDate).toLocaleDateString()}
            </div>
            <div className="col-6">
              <strong>Check-out:</strong> {new Date(checkOutDate).toLocaleDateString()}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <strong>Nights:</strong> {nights} night{nights !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <strong>Price per night:</strong> LKR {Number(room.price).toFixed(2)}
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <h4 className="text-success">Total: LKR {totalPrice.toFixed(2)}</h4>
            </div>
          </div>
        </div>

        {loading && <div className="alert alert-info">Checking availability...</div>}
        {!isAvailable && !loading && (
          <div className="alert alert-danger">This room is not available for the selected dates.</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="guestName" className="form-label">
              Full Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="guestName"
              name="guestName"
              value={formData.guestName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="guestEmail" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="guestEmail"
              name="guestEmail"
              value={formData.guestEmail}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="guestPhone" className="form-label">
              Phone Number <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              className="form-control"
              id="guestPhone"
              name="guestPhone"
              value={formData.guestPhone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="numberOfGuests" className="form-label">
              Number of Guests <span className="text-danger">*</span>{" "}
              <small className="text-muted">(Max: {room.maxGuests})</small>
            </label>
            <input
              type="number"
              className="form-control"
              id="numberOfGuests"
              name="numberOfGuests"
              min={1}
              max={room.maxGuests}
              value={formData.numberOfGuests}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="specialRequests" className="form-label">
              Special Requests
            </label>
            <textarea
              className="form-control"
              id="specialRequests"
              name="specialRequests"
              rows={3}
              value={formData.specialRequests}
              onChange={handleInputChange}
            />
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary" disabled={submitting || !isAvailable || loading}>
              {submitting ? "Processing..." : "Confirm Booking"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoomBookingForm;
