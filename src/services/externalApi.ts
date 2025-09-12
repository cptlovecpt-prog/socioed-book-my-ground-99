// External BU Sports API Integration
const API_BASE_URL = 'https://socioed.com/busports';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface Facility {
  id: number;
  sport_id: number;
  name: string;
  location: string;
  facility_type: string;
  quantity: number;
  length_meters: number;
  width_meters: number;
  total_area_sqm: number;
  max_students_per_slot: number;
  establishment_year: number;
  is_active: boolean;
  is_bookable: boolean;
  sport_name: string;
  total_daily_capacity: number;
  maintenance_notes?: string;
}

interface Booking {
  id: number;
  booking_number: string;
  student_name: string;
  student_university_id: string;
  facility_name: string;
  sport_name: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  participant_count: number;
  max_participants: number;
  created_at: string;
}

interface Sport {
  id: number;
  name: string;
  description: string;
  category: string;
  min_players: number;
  max_players: number;
  equipment_needed: string[];
  is_active: boolean;
  created_at: string;
}

interface AdminLoginRequest {
  university_id: string;
  password: string;
}

interface AdminLoginResponse {
  token: string;
  admin: {
    id: number;
    university_id: string;
    name: string;
    type: string;
  };
}

interface DashboardStats {
  total_students: number;
  total_facilities: number;
  total_sports: number;
  total_bookings: number;
  active_bookings: number;
  completed_bookings: number;
  todays_bookings: number;
  this_week_bookings: number;
  capacity_utilization: number;
  popular_sports: Array<{
    name: string;
    bookings: number;
    percentage: number;
  }>;
  peak_hours: Array<{
    hour: string;
    bookings: number;
  }>;
}

interface UtilizationData {
  facility_id: number;
  facility_name: string;
  sport_name: string;
  location: string;
  total_slots: number;
  booked_slots: number;
  utilization_percentage: number;
  total_capacity: number;
  total_participants: number;
  avg_participants_per_slot: number;
  peak_usage_time: string;
}

class ExternalApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('bu_sports_admin_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();
    
    if (!token) {
      throw new Error('Authentication token not found. Please login again.');
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (response.status === 401 || response.status === 403) {
        // Token expired or invalid, remove it
        this.removeAuthToken();
        throw new Error('Session expired. Please login again.');
      }

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('External API Request failed:', error);
      throw error;
    }
  }

  // Facilities Management
  async getFacilities(): Promise<ApiResponse<Facility[]>> {
    return this.request<Facility[]>('/api/admin/facilities');
  }

  async toggleFacilityBooking(facilityId: number, isBookable: boolean): Promise<ApiResponse<Facility>> {
    return this.request<Facility>(`/api/admin/facilities/${facilityId}/toggle-booking`, {
      method: 'PATCH',
      body: JSON.stringify({ is_bookable: isBookable }),
    });
  }

  async toggleFacilityActive(facilityId: number, isActive: boolean, reason?: string): Promise<ApiResponse<Facility>> {
    return this.request<Facility>(`/api/admin/facilities/${facilityId}/toggle-active`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: isActive, reason }),
    });
  }

  async createFacilityClosure(facilityId: number, closure: {
    closure_type: 'maintenance' | 'event' | 'emergency';
    start_date: string;
    end_date: string;
    start_time?: string;
    end_time?: string;
    reason: string;
  }): Promise<ApiResponse<any>> {
    return this.request(`/api/admin/facilities/${facilityId}/closures`, {
      method: 'POST',
      body: JSON.stringify(closure),
    });
  }

  async createFacility(facility: {
    sport_id: number;
    name: string;
    location: string;
    facility_type: string;
    quantity: number;
    length_meters: number;
    width_meters: number;
    max_students_per_slot: number;
    establishment_year: number;
  }): Promise<ApiResponse<Facility>> {
    return this.request<Facility>('/api/admin/facilities', {
      method: 'POST',
      body: JSON.stringify(facility),
    });
  }

  async updateFacility(facilityId: number, updates: Partial<Facility>): Promise<ApiResponse<Facility>> {
    return this.request<Facility>(`/api/admin/facilities/${facilityId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  // Sports Management
  async createSport(sport: {
    name: string;
    description: string;
    min_players: number;
    max_players: number;
    equipment_needed: string[];
  }): Promise<ApiResponse<Sport>> {
    return this.request<Sport>('/api/admin/sports', {
      method: 'POST',
      body: JSON.stringify(sport),
    });
  }

  // Bookings Management
  async getBookings(params?: {
    page?: number;
    limit?: number;
    status?: string;
    facility_id?: number;
    date?: string;
  }): Promise<ApiResponse<Booking[]>> {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const endpoint = `/api/admin/bookings${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return this.request<Booking[]>(endpoint);
  }

  // Authentication
  async adminLogin(credentials: AdminLoginRequest): Promise<ApiResponse<AdminLoginResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error(`Login failed: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success && data.data.token) {
        this.setAuthToken(data.data.token);
        localStorage.setItem('bu_sports_admin_user', JSON.stringify(data.data.admin));
      }
      
      return data;
    } catch (error) {
      console.error('Admin login failed:', error);
      throw error;
    }
  }

  async adminLogout(): Promise<void> {
    this.removeAuthToken();
    localStorage.removeItem('bu_sports_admin_user');
  }

  getAdminUser(): any {
    const userStr = localStorage.getItem('bu_sports_admin_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Analytics & Reports
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return this.request<DashboardStats>('/api/admin/dashboard/stats');
  }

  async getUtilizationAnalytics(startDate: string, endDate: string): Promise<ApiResponse<UtilizationData[]>> {
    return this.request<UtilizationData[]>(`/api/admin/analytics/utilization?start_date=${startDate}&end_date=${endDate}`);
  }

  // Token Management
  setAuthToken(token: string): void {
    localStorage.setItem('bu_sports_admin_token', token);
  }

  removeAuthToken(): void {
    localStorage.removeItem('bu_sports_admin_token');
    localStorage.removeItem('bu_sports_admin_user');
  }

  hasAuthToken(): boolean {
    return !!this.getAuthToken();
  }
}

export const externalApiService = new ExternalApiService();
export type { Facility, Booking, Sport, DashboardStats, UtilizationData, AdminLoginRequest, AdminLoginResponse };