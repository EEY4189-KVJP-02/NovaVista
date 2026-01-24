import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/Auth';
import './Dashboard.css';

interface RoomBooking {
  id: number;
  roomId: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: string;
  specialRequests?: string;
  room?: {
    id: number;
    type: string;
    branch: string;
    price: number;
    image?: string;
  };
}

interface EventBooking {
  id: number;
  hallId: number;
  eventName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  eventDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: string;
  specialRequests?: string;
  hall?: {
    id: number;
    name: string;
    location: string;
    price?: number;
  };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [roomBookings, setRoomBookings] = useState<RoomBooking[]>([]);
  const [eventBookings, setEventBookings] = useState<EventBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'rooms' | 'events'>('rooms');

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login?returnUrl=/dashboard');
      return;
    }

    fetchBookings();
  }, [navigate]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = authService.getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch room bookings
      const roomResponse = await fetch('http://localhost:5000/api/rooms/bookings/my', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (roomResponse.ok) {
        const roomData = await roomResponse.json();
        setRoomBookings(roomData);
      }

      // Fetch event bookings
      const eventResponse = await fetch('http://localhost:5000/api/event-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (eventResponse.ok) {
        const eventData = await eventResponse.json();
        setEventBookings(eventData);
      }

      setError(null);
    } catch (err: any) {
      setError('Failed to load bookings. Please try again.');
      console.error('Error fetching bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'status-confirmed';
      case 'pending':
        return 'status-pending';
      case 'cancelled':
        return 'status-cancelled';
      case 'checked_in':
        return 'status-checked-in';
      case 'checked_out':
        return 'status-checked-out';
      default:
        return 'status-pending';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Bookings</h1>
        <p>View and manage your room and event bookings</p>
      </div>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="dashboard-tabs">
        <button
          className={`tab-button ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          Room Bookings ({roomBookings.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Event Bookings ({eventBookings.length})
        </button>
      </div>

      {activeTab === 'rooms' && (
        <div className="bookings-section">
          {roomBookings.length === 0 ? (
            <div className="empty-state">
              <p>You don't have any room bookings yet.</p>
              <button className="btn-primary" onClick={() => navigate('/room-booking')}>
                Book a Room
              </button>
            </div>
          ) : (
            <div className="bookings-grid">
              {roomBookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  {booking.room?.image && (
                    <img src={booking.room.image} alt={booking.room.type} className="booking-image" />
                  )}
                  <div className="booking-content">
                    <div className="booking-header">
                      <h3>{booking.room?.type || 'Room'}</h3>
                      <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="booking-details">
                      <p><strong>Location:</strong> {booking.room?.branch || 'N/A'}</p>
                      <p><strong>Check-in:</strong> {formatDate(booking.checkInDate)}</p>
                      <p><strong>Check-out:</strong> {formatDate(booking.checkOutDate)}</p>
                      <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
                      <p><strong>Total Price:</strong> {formatCurrency(booking.totalPrice)}</p>
                      {booking.specialRequests && (
                        <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                      )}
                    </div>
                    <div className="booking-footer">
                      <p><strong>Guest:</strong> {booking.guestName}</p>
                      <p><strong>Email:</strong> {booking.guestEmail}</p>
                      <p><strong>Phone:</strong> {booking.guestPhone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bookings-section">
          {eventBookings.length === 0 ? (
            <div className="empty-state">
              <p>You don't have any event bookings yet.</p>
              <button className="btn-primary" onClick={() => navigate('/event')}>
                Book an Event
              </button>
            </div>
          ) : (
            <div className="bookings-grid">
              {eventBookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-content">
                    <div className="booking-header">
                      <h3>{booking.eventName}</h3>
                      <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="booking-details">
                      <p><strong>Hall:</strong> {booking.hall?.name || 'N/A'}</p>
                      <p><strong>Location:</strong> {booking.hall?.location || 'N/A'}</p>
                      <p><strong>Event Date:</strong> {formatDate(booking.eventDate)}</p>
                      <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
                      <p><strong>Total Price:</strong> {formatCurrency(booking.totalPrice)}</p>
                      {booking.specialRequests && (
                        <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
                      )}
                    </div>
                    <div className="booking-footer">
                      <p><strong>Contact:</strong> {booking.contactName}</p>
                      <p><strong>Email:</strong> {booking.contactEmail}</p>
                      <p><strong>Phone:</strong> {booking.contactPhone}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
