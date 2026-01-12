import React, { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import CommonHero from '../../components/Common/CommonHero';
import RoomBookingForm from './RoomBookingForm';
import { roomBookingService, Room, RoomFilters } from '../../services/RoomBooking';
import './roombooking.css';

const RoomBooking: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState<RoomFilters>({
    branch: undefined,
    checkInDate: undefined,
    checkOutDate: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    maxGuests: undefined,
  });

  const [tempCheckInDate, setTempCheckInDate] = useState<string>('');
  const [tempCheckOutDate, setTempCheckOutDate] = useState<string>('');

  useEffect(() => {
    fetchRooms();
  }, [filters]);

  const fetchRooms = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await roomBookingService.fetchRooms(filters);
      setRooms(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch rooms. Please try again.');
      console.error('Error fetching rooms:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof RoomFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const handleApplyDateFilter = () => {
    if (tempCheckInDate && tempCheckOutDate) {
      const checkIn = new Date(tempCheckInDate);
      const checkOut = new Date(tempCheckOutDate);
      
      if (checkOut <= checkIn) {
        alert('Check-out date must be after check-in date');
        return;
      }
      
      setFilters((prev) => ({
        ...prev,
        checkInDate: tempCheckInDate,
        checkOutDate: tempCheckOutDate,
      }));
    }
  };

  const handleClearFilters = () => {
    setFilters({
      branch: undefined,
      checkInDate: undefined,
      checkOutDate: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      maxGuests: undefined,
    });
    setTempCheckInDate('');
    setTempCheckOutDate('');
  };

  const handleBookNow = (room: Room) => {
    if (!filters.checkInDate || !filters.checkOutDate) {
      alert('Please select check-in and check-out dates first');
      return;
    }
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  const handleBookingSuccess = () => {
    // Refresh rooms after successful booking
    fetchRooms();
    setShowBookingForm(false);
    setSelectedRoom(null);
  };

  return (
    <div className="room-booking-page">
      <CommonHero
        src="/Images/single room.png"
        title="Room Booking"
        alt="Room"
        subTitle="Make every stay truly memorable."
      />
      
      <div className="container my-5">
        {/* Filters Section */}
        <div className="filters-section mb-4 p-3 bg-light rounded">
          <h4 className="mb-3">Search & Filter Rooms</h4>
          
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="branch" className="form-label">Branch</label>
              <select
                id="branch"
                className="form-select"
                value={filters.branch || ''}
                onChange={(e) => handleFilterChange('branch', e.target.value || undefined)}
              >
                <option value="">All Branches</option>
                <option value="Jaffna">Jaffna</option>
                <option value="Kilinochchi">Kilinochchi</option>
                <option value="Mannar">Mannar</option>
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="checkInDate" className="form-label">Check-in Date</label>
              <input
                type="date"
                id="checkInDate"
                className="form-control"
                value={tempCheckInDate}
                onChange={(e) => setTempCheckInDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="checkOutDate" className="form-label">Check-out Date</label>
              <input
                type="date"
                id="checkOutDate"
                className="form-control"
                value={tempCheckOutDate}
                onChange={(e) => setTempCheckOutDate(e.target.value)}
                min={tempCheckInDate || new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="maxGuests" className="form-label">Max Guests</label>
              <input
                type="number"
                id="maxGuests"
                className="form-control"
                min="1"
                value={filters.maxGuests || ''}
                onChange={(e) => handleFilterChange('maxGuests', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          </div>

          <div className="row g-3 mt-2">
            <div className="col-md-3">
              <label htmlFor="minPrice" className="form-label">Min Price (LKR)</label>
              <input
                type="number"
                id="minPrice"
                className="form-control"
                min="0"
                value={filters.minPrice || ''}
                onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="maxPrice" className="form-label">Max Price (LKR)</label>
              <input
                type="number"
                id="maxPrice"
                className="form-control"
                min="0"
                value={filters.maxPrice || ''}
                onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
              />
            </div>

            <div className="col-md-6 d-flex align-items-end gap-2">
              <button className="btn btn-primary" onClick={handleApplyDateFilter}>
                Apply Date Filter
              </button>
              <button className="btn btn-secondary" onClick={handleClearFilters}>
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && rooms.length === 0 && (
          <div className="alert alert-info" role="alert">
            No rooms found matching your criteria. Please try different filters.
          </div>
        )}

        {!loading && !error && rooms.length > 0 && (
          <>
            <h4 className="mb-4">Available Rooms ({rooms.length})</h4>
            <div className="row">
              {rooms.map((room) => (
                <div key={room.id} className="col-md-4 mb-4">
                  <RoomCard
                    room={room}
                    onBookNow={() => handleBookNow(room)}
                    checkInDate={filters.checkInDate}
                    checkOutDate={filters.checkOutDate}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && selectedRoom && filters.checkInDate && filters.checkOutDate && (
        <RoomBookingForm
          room={selectedRoom}
          checkInDate={filters.checkInDate}
          checkOutDate={filters.checkOutDate}
          onBookingSuccess={handleBookingSuccess}
          onClose={() => {
            setShowBookingForm(false);
            setSelectedRoom(null);
          }}
        />
      )}
    </div>
  );
};

export default RoomBooking;
