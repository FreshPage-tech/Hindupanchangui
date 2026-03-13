/**
 * Frontend API Service (Firebase)
 * ALL API calls to backend Cloud Functions go through here
 * NO BUSINESS LOGIC IN FRONTEND - only API communication
 */

// Store token in memory (use context/state management in production)
let authToken: string | null = null;

// Get Firebase project ID and region from environment
const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID || '';
const FIREBASE_REGION = import.meta.env.VITE_FIREBASE_REGION || 'us-central1';
const API_BASE_URL = `https://${FIREBASE_REGION}-${FIREBASE_PROJECT_ID}.cloudfunctions.net/api`;

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
      ...(token && { 'Authorization': `Bearer ${token}` }),
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

export const AuthAPI = {
  register: async (data: RegisterData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Note: For Firebase, login is typically handled by Firebase Auth SDK on client side
  // This function would be used after Firebase client-side login to store token
  setToken: (token: string) => {
    setAuthToken(token);
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

// ============================================
// ASTROLOGY / RASHI API
// ============================================

export interface RashiData {
  id: string;
  name: string;
  nameHindi: string;
  element: string;
  quality: string;
  rulingPlanet: string;
  symbol: string;
  dates: string;
  luckyNumbers: number[];
  luckyColors: string[];
  luckyGemstone: string;
  compatibility: {
    best: string[];
    good: string[];
    challenging: string[];
  };
  characteristics: {
    positive: string[];
    negative: string[];
  };
  todayPrediction: string;
  weeklyPrediction: string;
  monthlyPrediction: string;
  careerGuidance: string;
  loveGuidance: string;
  healthGuidance: string;
  financeGuidance: string;
  luckyDay: string;
  luckyTime: string;
}

export const AstrologyAPI = {
  // Get all zodiac signs
  getAllRashi: async () => {
    return apiRequest<RashiData[]>('/astrology/rashi', {
      method: 'GET',
    });
  },

  // Get specific Rashi by ID (e.g., 'aries', 'taurus')
  getRashiById: async (rashiId: string) => {
    return apiRequest<RashiData>(`/astrology/rashi/${rashiId}`, {
      method: 'GET',
    });
  },

  // Get Rashi by birth date
  getRashiByDate: async (birthDate: string) => {
    return apiRequest<RashiData>(`/astrology/rashi-by-date/${birthDate}`, {
      method: 'GET',
    });
  },

  // Get compatibility between two Rashi
  getCompatibility: async (rashi1: string, rashi2: string) => {
    return apiRequest(`/astrology/compatibility?rashi1=${rashi1}&rashi2=${rashi2}`, {
      method: 'GET',
    });
  },
};