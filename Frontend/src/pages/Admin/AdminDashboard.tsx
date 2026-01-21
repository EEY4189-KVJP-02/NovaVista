import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AdminDashboard.css';

interface RoomBooking {
  id: number;
  roomId: number;
  userId?: number;
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
  };
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

interface EventBooking {
  id: number;
  hallId: number;
  userId?: number;
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
  };
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

interface CalendarEvent {
  id: number;
  type: 'room' | 'event';
  title: string;
  start: string;
  end: string;
  location: string;
  booking: RoomBooking | EventBooking;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'rooms' | 'events' | 'calendar'>('rooms');
  const [roomBookings, setRoomBookings] = useState<RoomBooking[]>([]);
  const [eventBookings, setEventBookings] = useState<EventBooking[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<RoomBooking | EventBooking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState<RoomBooking | EventBooking | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem('userRole');
    if (!authService.isAuthenticated() || userRole !== 'admin') {
      navigate('/login?returnUrl=/admin');
      return;
    }

    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const token = authService.getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      // Fetch room bookings
      const roomResponse = await fetch('http://localhost:3001/api/admin/room-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (roomResponse.ok) {
        const roomData = await roomResponse.json();
        setRoomBookings(roomData);
      }

      // Fetch event bookings
      const eventResponse = await fetch('http://localhost:3001/api/admin/event-bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (eventResponse.ok) {
        const eventData = await eventResponse.json();
        setEventBookings(eventData);
      }

      // Fetch calendar data
      const calendarResponse = await fetch('http://localhost:3001/api/admin/calendar', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (calendarResponse.ok) {
        const calendarData = await calendarResponse.json();
        const allEvents: CalendarEvent[] = [
          ...calendarData.roomBookings,
          ...calendarData.eventBookings,
        ];
        setCalendarEvents(allEvents);
      }

      setError(null);
    } catch (err: any) {
      setError('Failed to load data. Please try again.');
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, type: 'room' | 'event') => {
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    try {
      const token = authService.getToken();
      if (!token) return;

      const endpoint = type === 'room' 
        ? `http://localhost:3001/api/admin/room-bookings/${id}`
        : `http://localhost:3001/api/admin/event-bookings/${id}`;

      const response = await fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        fetchAllData(); // Refresh data
      } else {
        alert('Failed to delete booking');
      }
    } catch (err) {
      alert('Error deleting booking');
      console.error(err);
    }
  };

  const handleEdit = (booking: RoomBooking | EventBooking) => {
    setEditingBooking(booking);
    setShowModal(true);
  };

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    // Find bookings for this date
    const bookingsForDate = calendarEvents.filter(event => {
      if (event.type === 'room') {
        const booking = event.booking as RoomBooking;
        return booking.checkInDate <= date && booking.checkOutDate >= date;
      } else {
        const booking = event.booking as EventBooking;
        return booking.eventDate === date;
      }
    });

    if (bookingsForDate.length > 0) {
      setSelectedBooking(bookingsForDate[0].booking);
      setShowModal(true);
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

  // Generate calendar days for current month
  const getCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const hasBooking = calendarEvents.some(event => {
        if (event.type === 'room') {
          const booking = event.booking as RoomBooking;
          return booking.checkInDate <= dateStr && booking.checkOutDate >= dateStr;
        } else {
          const booking = event.booking as EventBooking;
          return booking.eventDate === dateStr;
        }
      });
      days.push({ day, dateStr, hasBooking });
    }

    return days;
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage all bookings and view calendar</p>
      </div>

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      <div className="admin-tabs">
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
        <button
          className={`tab-button ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          Calendar View
        </button>
      </div>

      {activeTab === 'rooms' && (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room</th>
                <th>Location</th>
                <th>Guest</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Guests</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roomBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.room?.type || 'N/A'}</td>
                  <td>{booking.room?.branch || 'N/A'}</td>
                  <td>{booking.guestName}</td>
                  <td>{booking.guestEmail}</td>
                  <td>{booking.guestPhone}</td>
                  <td>{formatDate(booking.checkInDate)}</td>
                  <td>{formatDate(booking.checkOutDate)}</td>
                  <td>{booking.numberOfGuests}</td>
                  <td>{formatCurrency(booking.totalPrice)}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(booking)} title="Edit">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(booking.id, 'room')} title="Delete">
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="bookings-table-container">
          <table className="bookings-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Event Name</th>
                <th>Hall</th>
                <th>Location</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date</th>
                <th>Guests</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {eventBookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.eventName}</td>
                  <td>{booking.hall?.name || 'N/A'}</td>
                  <td>{booking.hall?.location || 'N/A'}</td>
                  <td>{booking.contactName}</td>
                  <td>{booking.contactEmail}</td>
                  <td>{booking.contactPhone}</td>
                  <td>{formatDate(booking.eventDate)}</td>
                  <td>{booking.numberOfGuests}</td>
                  <td>{formatCurrency(booking.totalPrice)}</td>
                  <td>
                    <span className={`status-badge ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(booking)} title="Edit">
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(booking.id, 'event')} title="Delete">
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'calendar' && (
        <div className="calendar-container">
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            {getCalendarDays().map((dayInfo, index) => (
              <div
                key={index}
                className={`calendar-day ${dayInfo?.hasBooking ? 'has-booking' : ''} ${!dayInfo ? 'empty' : ''}`}
                onClick={() => dayInfo && handleDateClick(dayInfo.dateStr)}
              >
                {dayInfo?.day}
              </div>
            ))}
          </div>
          <div className="calendar-legend">
            <div className="legend-item">
              <div className="legend-color has-booking"></div>
              <span>Has Booking</span>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showModal && (selectedBooking || editingBooking) && (
        <div className="modal-overlay" onClick={() => {
          setShowModal(false);
          setSelectedBooking(null);
          setEditingBooking(null);
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => {
              setShowModal(false);
              setSelectedBooking(null);
              setEditingBooking(null);
            }}>×</button>
            <h2>Booking Details</h2>
            {editingBooking ? (
              <div className="booking-details">
                <p><strong>ID:</strong> {editingBooking.id}</p>
                {'room' in editingBooking ? (
                  <>
                    <p><strong>Room:</strong> {(editingBooking as RoomBooking).room?.type}</p>
                    <p><strong>Location:</strong> {(editingBooking as RoomBooking).room?.branch}</p>
                    <p><strong>Guest:</strong> {(editingBooking as RoomBooking).guestName}</p>
                    <p><strong>Email:</strong> {(editingBooking as RoomBooking).guestEmail}</p>
                    <p><strong>Phone:</strong> {(editingBooking as RoomBooking).guestPhone}</p>
                    <p><strong>Check-in:</strong> {formatDate((editingBooking as RoomBooking).checkInDate)}</p>
                    <p><strong>Check-out:</strong> {formatDate((editingBooking as RoomBooking).checkOutDate)}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Event:</strong> {(editingBooking as EventBooking).eventName}</p>
                    <p><strong>Hall:</strong> {(editingBooking as EventBooking).hall?.name}</p>
                    <p><strong>Location:</strong> {(editingBooking as EventBooking).hall?.location}</p>
                    <p><strong>Contact:</strong> {(editingBooking as EventBooking).contactName}</p>
                    <p><strong>Email:</strong> {(editingBooking as EventBooking).contactEmail}</p>
                    <p><strong>Phone:</strong> {(editingBooking as EventBooking).contactPhone}</p>
                    <p><strong>Date:</strong> {formatDate((editingBooking as EventBooking).eventDate)}</p>
                  </>
                )}
                <p><strong>Status:</strong> 
                  <select 
                    value={editingBooking.status}
                    onChange={async (e) => {
                      const token = authService.getToken();
                      if (!token) return;
                      
                      const endpoint = 'room' in editingBooking
                        ? `http://localhost:3001/api/admin/room-bookings/${editingBooking.id}`
                        : `http://localhost:3001/api/admin/event-bookings/${editingBooking.id}`;
                      
                      try {
                        await fetch(endpoint, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                          },
                          body: JSON.stringify({ status: e.target.value }),
                        });
                        fetchAllData();
                        setEditingBooking({ ...editingBooking, status: e.target.value });
                      } catch (err) {
                        alert('Failed to update status');
                      }
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    {'room' in editingBooking && (
                      <>
                        <option value="checked_in">Checked In</option>
                        <option value="checked_out">Checked Out</option>
                      </>
                    )}
                  </select>
                </p>
                <p><strong>Total Price:</strong> {formatCurrency(editingBooking.totalPrice)}</p>
              </div>
            ) : selectedBooking && (
              <div className="booking-details">
                <p><strong>ID:</strong> {selectedBooking.id}</p>
                {'room' in selectedBooking ? (
                  <>
                    <p><strong>Room:</strong> {(selectedBooking as RoomBooking).room?.type}</p>
                    <p><strong>Guest:</strong> {(selectedBooking as RoomBooking).guestName}</p>
                    <p><strong>Email:</strong> {(selectedBooking as RoomBooking).guestEmail}</p>
                    <p><strong>Phone:</strong> {(selectedBooking as RoomBooking).guestPhone}</p>
                  </>
                ) : (
                  <>
                    <p><strong>Event:</strong> {(selectedBooking as EventBooking).eventName}</p>
                    <p><strong>Contact:</strong> {(selectedBooking as EventBooking).contactName}</p>
                    <p><strong>Email:</strong> {(selectedBooking as EventBooking).contactEmail}</p>
                    <p><strong>Phone:</strong> {(selectedBooking as EventBooking).contactPhone}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
