const API_BASE_URL = 'http://localhost:5000/api';
export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  firstName?: string;
  lastName?: string;
}
export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
class AuthService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = API_BASE_URL;
  }
  async register(data: {
    username: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  }): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        let errorMessage = 'Registration failed';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      return response.json();
    } catch (error: any) {
      // Handle network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Cannot connect to server. Please make sure the backend server is running on port .');
      }
      throw error;
    }
  }
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        let errorMessage = 'Login failed';
        try {
          const error = await response.json();
          errorMessage = error.message || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      return response.json();
    } catch (error: any) {
      // Handle network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Cannot connect to server. Please make sure the backend server is running on port 3001.');
      }
      throw error;
    }
  }
  async getCurrentUser(): Promise<{ user: User }> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found');
    }
    const response = await fetch(`${this.baseUrl}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to get user');
    }
    return response.json();
  }
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  setUser(user: User): void {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userName', user.username);
    localStorage.setItem('userRole', user.role);
    if (user.firstName) localStorage.setItem('firstName', user.firstName);
    if (user.lastName) localStorage.setItem('lastName', user.lastName);
  }
  getUser(): User | null {
    const token = this.getToken();
    if (!token) return null;
    return {
      id: parseInt(localStorage.getItem('userId') || '0'),
      username: localStorage.getItem('userName') || '',
      email: localStorage.getItem('userEmail') || '',
      role: (localStorage.getItem('userRole') as 'user' | 'admin') || 'user',
      firstName: localStorage.getItem('firstName') || undefined,
      lastName: localStorage.getItem('lastName') || undefined,
    };
  }
}
export const authService = new AuthService();