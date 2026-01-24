const API_BASE_URL = 'http://localhost:5000/api';

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
  };
}

class RoomBookingService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchRooms(filters?: RoomFilters): Promise<Room[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.branch) queryParams.append('branch', filters.branch);
      if (filters?.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
      if (filters?.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
      if (filters?.maxGuests) queryParams.append('maxGuests', filters.maxGuests.toString());
      if (filters?.checkInDate) queryParams.append('checkInDate', filters.checkInDate);
      if (filters?.checkOutDate) queryParams.append('checkOutDate', filters.checkOutDate);
      
      const url = `${this.baseUrl}/rooms${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  }

  async fetchRoomById(id: number): Promise<Room> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching room:', error);
      throw error;
    }
  }

  async checkAvailability(roomId: number, checkInDate: string, checkOutDate: string): Promise<RoomAvailability> {
    try {
      const response = await fetch(`${this.baseUrl}/rooms/${roomId}/availability`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checkInDate, checkOutDate }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking availability:', error);
      throw error;
    }
  }

  async createBooking(roomId: number, bookingData: BookingData): Promise<BookingResponse> {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required. Please login to continue.');
      }

      const response = await fetch(`${this.baseUrl}/rooms/${roomId}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }
}

export const roomBookingService = new RoomBookingService(API_BASE_URL);
