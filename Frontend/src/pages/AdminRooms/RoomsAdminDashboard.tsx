import React, { useEffect, useMemo, useState } from "react";
import { Room } from "../../services/RoomBooking";
import "./RoomsAdminDashboard.css";

type Tab = "rooms" | "bookings";

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
  specialRequests?: string | null;
  createdAt?: string;
  updatedAt?: string;
  room?: Room;
}

const API_ADMIN = "http://localhost:5000/api/admin";

const RoomsAdminDashboard: React.FC = () => {
  const [tab, setTab] = useState<Tab>("rooms");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<RoomBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Partial<Room> | null>(null);

  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const [roomsRes, bookingsRes] = await Promise.all([
        fetch(`${API_ADMIN}/rooms`),
        fetch(`${API_ADMIN}/room-bookings`),
      ]);

      if (!roomsRes.ok) throw new Error("Failed to load rooms");
      if (!bookingsRes.ok) throw new Error("Failed to load room bookings");

      const [roomsData, bookingsData] = await Promise.all([roomsRes.json(), bookingsRes.json()]);
      setRooms(roomsData);
      setBookings(bookingsData);
    } catch (e: any) {
      setError(e?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const activeRoomsCount = useMemo(() => rooms.filter((r) => r.isActive).length, [rooms]);

  const seedDefaultRooms = async () => {
    try {
      setLoading(true);
      await fetch(`${API_ADMIN}/rooms/seed`, { method: "POST" });
      await refresh();
    } catch (e) {
      setError("Failed to seed default rooms");
      setLoading(false);
    }
  };

  const openCreateRoom = () => {
    setEditingRoom({
      type: "",
      description: "",
      price: 0,
      image: "/Images/single room.png",
      branch: "Jaffna",
      maxGuests: 2,
      amenities: [],
      isActive: true,
    });
    setShowRoomModal(true);
  };

  const openEditRoom = (room: Room) => {
    setEditingRoom({ ...room });
    setShowRoomModal(true);
  };

  const saveRoom = async () => {
    if (!editingRoom) return;
    try {
      setLoading(true);
      setError(null);

      const payload = {
        ...editingRoom,
        price: Number(editingRoom.price ?? 0),
        maxGuests: Number(editingRoom.maxGuests ?? 2),
        amenities: Array.isArray(editingRoom.amenities) ? editingRoom.amenities : [],
      };

      const isEdit = typeof editingRoom.id === "number";
      const res = await fetch(isEdit ? `${API_ADMIN}/rooms/${editingRoom.id}` : `${API_ADMIN}/rooms`, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save room");
      setShowRoomModal(false);
      setEditingRoom(null);
      await refresh();
    } catch (e: any) {
      setError(e?.message || "Failed to save room");
      setLoading(false);
    }
  };

  const deactivateRoom = async (roomId: number) => {
    if (!window.confirm("Deactivate this room?")) return;
    try {
      setLoading(true);
      const res = await fetch(`${API_ADMIN}/rooms/${roomId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to deactivate room");
      await refresh();
    } catch (e: any) {
      setError(e?.message || "Failed to deactivate room");
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      const res = await fetch(`${API_ADMIN}/room-bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update booking");
      await refresh();
    } catch (e: any) {
      setError(e?.message || "Failed to update booking");
    }
  };

  const deleteBooking = async (bookingId: number) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      const res = await fetch(`${API_ADMIN}/room-bookings/${bookingId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete booking");
      await refresh();
    } catch (e: any) {
      setError(e?.message || "Failed to delete booking");
    }
  };

  return (
    <div className="rooms-admin-page container py-4">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div>
          <h2 className="mb-0">Rooms Admin</h2>
          <small className="text-muted">
            Rooms: {activeRoomsCount}/{rooms.length} active • Bookings: {bookings.length}
          </small>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={seedDefaultRooms} disabled={loading}>
            Seed default rooms
          </button>
          <button className="btn btn-primary" onClick={openCreateRoom} disabled={loading}>
            Add room
          </button>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${tab === "rooms" ? "active" : ""}`} onClick={() => setTab("rooms")}>
            Rooms
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${tab === "bookings" ? "active" : ""}`} onClick={() => setTab("bookings")}>
            Room bookings
          </button>
        </li>
      </ul>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && tab === "rooms" && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Branch</th>
                <th>Price</th>
                <th>Max guests</th>
                <th>Active</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rooms.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.type}</td>
                  <td>{r.branch}</td>
                  <td>LKR {Number(r.price).toFixed(0)}</td>
                  <td>{r.maxGuests}</td>
                  <td>
                    <span className={`badge ${r.isActive ? "bg-success" : "bg-secondary"}`}>
                      {r.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => openEditRoom(r)}>
                      Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deactivateRoom(r.id)} disabled={!r.isActive}>
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-muted py-4">
                    No rooms yet. Click “Seed default rooms”.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tab === "bookings" && (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>ID</th>
                <th>Room</th>
                <th>Branch</th>
                <th>Guest</th>
                <th>Dates</th>
                <th>Guests</th>
                <th>Total</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.room?.type || `#${b.roomId}`}</td>
                  <td>{b.room?.branch || "-"}</td>
                  <td>
                    <div className="fw-semibold">{b.guestName}</div>
                    <small className="text-muted">{b.guestEmail}</small>
                  </td>
                  <td>
                    <small>
                      {b.checkInDate} → {b.checkOutDate}
                    </small>
                  </td>
                  <td>{b.numberOfGuests}</td>
                  <td>LKR {Number(b.totalPrice).toFixed(0)}</td>
                  <td style={{ minWidth: 160 }}>
                    <select
                      className="form-select form-select-sm"
                      value={b.status}
                      onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                    >
                      <option value="pending">pending</option>
                      <option value="confirmed">confirmed</option>
                      <option value="cancelled">cancelled</option>
                      <option value="checked_in">checked_in</option>
                      <option value="checked_out">checked_out</option>
                    </select>
                  </td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-danger" onClick={() => deleteBooking(b.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center text-muted py-4">
                    No bookings yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showRoomModal && editingRoom && (
        <div className="rad-modal-backdrop" onClick={() => setShowRoomModal(false)}>
          <div className="rad-modal" onClick={(e) => e.stopPropagation()}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">{typeof editingRoom.id === "number" ? "Edit room" : "Add room"}</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setShowRoomModal(false)}>
                Close
              </button>
            </div>

            <div className="row g-2">
              <div className="col-12">
                <label className="form-label">Type</label>
                <input
                  className="form-control"
                  value={editingRoom.type ?? ""}
                  onChange={(e) => setEditingRoom((p) => ({ ...(p || {}), type: e.target.value }))}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control"
                  rows={3}
                  value={editingRoom.description ?? ""}
                  onChange={(e) => setEditingRoom((p) => ({ ...(p || {}), description: e.target.value }))}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Branch</label>
                <select
                  className="form-select"
                  value={(editingRoom.branch as any) ?? "Jaffna"}
                  onChange={(e) => setEditingRoom((p) => ({ ...(p || {}), branch: e.target.value as any }))}
                >
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Mannar">Mannar</option>
                </select>
              </div>
              <div className="col-6">
                <label className="form-label">Price (LKR / night)</label>
                <input
                  type="number"
                  className="form-control"
                  value={Number(editingRoom.price ?? 0)}
                  onChange={(e) => setEditingRoom((p) => ({ ...(p || {}), price: Number(e.target.value) }))}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Max guests</label>
                <input
                  type="number"
                  className="form-control"
                  value={Number(editingRoom.maxGuests ?? 2)}
                  onChange={(e) => setEditingRoom((p) => ({ ...(p || {}), maxGuests: Number(e.target.value) }))}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Active</label>
                <select
                  className="form-select"
                  value={editingRoom.isActive ? "true" : "false"}
                  onChange={(e) => setEditingRoom((p) => ({ ...(p || {}), isActive: e.target.value === "true" }))}
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Image path</label>
                <input
                  className="form-control"
                  value={editingRoom.image ?? ""}
                  onChange={(e) => setEditingRoom((p) => ({ ...(p || {}), image: e.target.value }))}
                />
                <small className="text-muted">Example: /Images/single room.png</small>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-2 mt-3">
              <button className="btn btn-outline-secondary" onClick={() => setShowRoomModal(false)} disabled={loading}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={saveRoom} disabled={loading}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsAdminDashboard;
