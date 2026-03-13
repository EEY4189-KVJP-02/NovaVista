const API_BASE_URL = "http://localhost:5000/api";

export interface EventHall {
  id: number;
  name: string;
  location: string;
  seating: string;
  capacity: number;
  description: string;
  rating: number;
  image?: string;
  hall_availabilities: HallAvailability[];
}

export interface HallAvailability {
  id: number;
  hall_id: number;
  booking_date: string;
  time_slot: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetchEventHalls(filters?: {
    location?: string;
    seating?: string;
    minCapacity?: number;
    maxCapacity?: number;
    eventDate?: string;
    timeSlot?: string;
  }): Promise<EventHall[]> {
    try {
      // Build query parameters
      const queryParams = new URLSearchParams();
      if (filters?.location) queryParams.append("location", filters.location);
      if (filters?.seating) queryParams.append("seating", filters.seating);
      if (filters?.minCapacity)
        queryParams.append("minCapacity", filters.minCapacity.toString());
      if (filters?.maxCapacity)
        queryParams.append("maxCapacity", filters.maxCapacity.toString());
      if (filters?.eventDate)
        queryParams.append("eventDate", filters.eventDate);
      if (filters?.timeSlot) queryParams.append("timeSlot", filters.timeSlot);

      const url = `${this.baseUrl}/halls${queryParams.toString() ? "?" + queryParams.toString() : ""}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }

  async fetchEventHallById(id: number): Promise<EventHall> {
    try {
      const response = await fetch(`${this.baseUrl}/halls/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching event hall:", error);
      throw error;
    }
  }
}

export const apiService = new ApiService(API_BASE_URL);
