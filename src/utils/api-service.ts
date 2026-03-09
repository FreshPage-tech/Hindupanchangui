/**
 * Frontend API Service
 * ALL API calls to backend microservices go through here
 * NO BUSINESS LOGIC IN FRONTEND - only API communication
 */

import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e18c4393`;

// Store token in memory (use context/state management in production)
let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) {
    localStorage.setItem('vedic_auth_token', token);
  } else {
    localStorage.removeItem('vedic_auth_token');
  }
}

export function getAuthToken(): string | null {
  if (!authToken) {
    authToken = localStorage.getItem('vedic_auth_token');
  }
  return authToken;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const token = getAuthToken();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token || publicAnonKey}`,
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error(`API Error (${endpoint}):`, result);
    }
    
    return result;
  } catch (error) {
    console.error(`API Request Error (${endpoint}):`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error'
    };
  }
}

// ============================================
// AUTHENTICATION API
// ============================================

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  language?: string;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const AuthAPI = {
  register: async (data: RegisterData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  login: async (data: LoginData) => {
    const result = await apiRequest<{ accessToken: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    if (result.success && result.data?.accessToken) {
      setAuthToken(result.data.accessToken);
    }
    
    return result;
  },

  verify: async () => {
    return apiRequest('/auth/verify', {
      method: 'GET',
    });
  },

  logout: async () => {
    const result = await apiRequest('/auth/logout', {
      method: 'POST',
    });
    
    if (result.success) {
      setAuthToken(null);
    }
    
    return result;
  },
};

// ============================================
// USER MANAGEMENT API
// ============================================

export const UserAPI = {
  getProfile: async () => {
    return apiRequest('/user/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (updates: any) => {
    return apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  updateSubscription: async (plan: 'free' | 'premium', duration?: number) => {
    return apiRequest('/user/subscription', {
      method: 'POST',
      body: JSON.stringify({ plan, duration }),
    });
  },

  checkPremium: async () => {
    return apiRequest<{ hasPremium: boolean }>('/user/premium', {
      method: 'GET',
    });
  },

  updatePreferences: async (preferences: any) => {
    return apiRequest('/user/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  },

  deleteAccount: async () => {
    const result = await apiRequest('/user/account', {
      method: 'DELETE',
    });
    
    if (result.success) {
      setAuthToken(null);
    }
    
    return result;
  },
};

// ============================================
// PANCHANG API
// ============================================

export interface PanchangData {
  date: string;
  calendarType: string;
  tithi: any;
  nakshatra: any;
  yoga: any;
  karana: string;
  vara: any;
  maasa: string;
  ritu: string;
  vikramSamvat: number;
  sakaSamvat: number;
  timings: any;
  inauspicious: any;
  auspicious: any;
}

export const PanchangAPI = {
  getForDate: async (date: string, calendarType: string = 'hindu') => {
    return apiRequest<PanchangData>(`/panchang/date/${date}?calendarType=${calendarType}`, {
      method: 'GET',
    });
  },

  getRange: async (startDate: string, endDate: string, calendarType: string = 'hindu') => {
    return apiRequest<PanchangData[]>(
      `/panchang/range?startDate=${startDate}&endDate=${endDate}&calendarType=${calendarType}`,
      {
        method: 'GET',
      }
    );
  },
};

// ============================================
// KUNDALI API
// ============================================

export interface CreateKundaliData {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
}

export interface KundaliData {
  id: string;
  userId: string;
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: any;
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planets: any;
  houses: any;
  dashas: any;
  predictions: any;
  createdAt: string;
}

export const KundaliAPI = {
  create: async (data: CreateKundaliData) => {
    return apiRequest<KundaliData>('/kundali', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async () => {
    return apiRequest<KundaliData[]>('/kundali', {
      method: 'GET',
    });
  },

  getById: async (id: string) => {
    return apiRequest<KundaliData>(`/kundali/${id}`, {
      method: 'GET',
    });
  },

  delete: async (id: string) => {
    return apiRequest(`/kundali/${id}`, {
      method: 'DELETE',
    });
  },
};

// ============================================
// ANALYTICS API (Admin Only)
// ============================================

export const AnalyticsAPI = {
  getGlobal: async () => {
    return apiRequest('/analytics/global', {
      method: 'GET',
    });
  },

  getUserStats: async (userId: string) => {
    return apiRequest(`/analytics/user/${userId}`, {
      method: 'GET',
    });
  },
};
