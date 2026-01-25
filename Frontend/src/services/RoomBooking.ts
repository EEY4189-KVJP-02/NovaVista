const API_BASE_URL = "http://localhost:5000/api";

export interface Room {
  id: number;
  type: string;
  description: string;
  price: number;
  image: string;
  branch: "Jaffna" | "Kilinochchi" | "Mannar";
  maxGuests: number;
  amenities: string[];
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomFilters {
  branch?: "Jaffna" | "Kilinochchi" | "Mannar";
  minPrice?: number;
  maxPrice?: number;
  maxGuests?: number;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface RoomAvailability {
  isAvailable: boolean;
  room: Room;
  nights: number;
  totalPrice: number;
}

export interface BookingData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  specialRequests?: string;
}

export interface BookingResponse {
  message: string;
  booking: {
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
    specialRequests: string | null;
    createdAt: string;
    updatedAt: string;
    room?: Room;
  };
}

class RoomBookingService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchRooms(filters?: RoomFilters): Promise<Room[]> {
    const queryParams = new URLSearchParams();

    if (filters?.branch) queryParams.append("branch", filters.branch);
    if (filters?.minPrice != null) queryParams.append("minPrice", filters.minPrice.toString());
    if (filters?.maxPrice != null) queryParams.append("maxPrice", filters.maxPrice.toString());
    if (filters?.maxGuests != null) queryParams.append("maxGuests", filters.maxGuests.toString());
    if (filters?.checkInDate) queryParams.append("checkInDate", filters.checkInDate);
    if (filters?.checkOutDate) queryParams.append("checkOutDate", filters.checkOutDate);

    const url = `${this.baseUrl}/rooms${queryParams.toString() ? "?" + queryParams.toString() : ""}`;
    const response = await fetch(url);
    if (!response.ok) {
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const text = await response.text().catch(() => "");
      throw new Error(text || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async fetchRoomById(id: number): Promise<Room> {
    const url = `${this.baseUrl}/rooms/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const text = await response.text().catch(() => "");
      throw new Error(text || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  async checkAvailability(roomId: number, checkInDate: string, checkOutDate: string): Promise<RoomAvailability> {
    const url = `${this.baseUrl}/rooms/${roomId}/availability`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checkInDate, checkOutDate }),
    });

    if (!response.ok) {
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const text = await response.text().catch(() => "");
      throw new Error(text || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async createBooking(roomId: number, bookingData: BookingData): Promise<BookingResponse> {
    const url = `${this.baseUrl}/rooms/${roomId}/book`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const ct = response.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      const text = await response.text().catch(() => "");
      throw new Error(text || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }
}

export const roomBookingService = new RoomBookingService(API_BASE_URL);
