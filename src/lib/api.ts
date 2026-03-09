/**
 * Mock API Service for VedicTime App
 * 
 * This simulates how the mobile app would consume APIs from the Admin Panel
 * In production, these would be real HTTP requests to your backend API
 */

const API_BASE_URL = "https://admin.vedictime.com/api"; // Admin Panel API Domain

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ============================================
// PANCHANG API
// ============================================

export const PanchangAPI = {
  /**
   * GET /api/panchang/today
   * Fetch today's panchang data
   */
  getToday: async (calendarType: string = "hindu") => {
    await delay(500);
    return {
      success: true,
      data: {
        date: "2026-03-06",
        day: "Friday",
        tithi: "Chaturdashi",
        nakshatra: "Rohini",
        yoga: "Siddha Yoga",
        sunrise: "6:24 AM",
        sunset: "5:47 PM",
        moonrise: "7:15 PM",
        moonset: "6:30 AM",
        rahuKaal: "12:00 PM - 1:30 PM",
        gulikaKaal: "9:00 AM - 10:30 AM",
        yamaganda: "7:30 AM - 9:00 AM",
        abhijitMuhurat: "11:52 AM - 12:40 PM",
        brahmaMuhurat: "4:40 AM - 5:28 AM",
        goduliMuhurat: "5:35 PM - 5:59 PM",
        calendarType,
      },
    };
  },

  /**
   * GET /api/panchang/:date
   * Fetch panchang for specific date
   */
  getByDate: async (date: string, calendarType: string = "hindu") => {
    await delay(500);
    return {
      success: true,
      data: {
        date,
        calendarType,
        // ... panchang data
      },
    };
  },
};

// ============================================
// FESTIVALS API
// ============================================

export const FestivalsAPI = {
  /**
   * GET /api/festivals
   * Get all festivals (with pagination)
   */
  getAll: async (page: number = 1, limit: number = 10) => {
    await delay(500);
    return {
      success: true,
      data: [
        {
          id: "1",
          name: "Mahashivratri",
          date: "2026-03-10",
          category: "Major Festival",
          description: "The Great Night of Shiva",
          isPremium: false,
          imageUrl: "https://example.com/mahashivratri.jpg",
        },
        {
          id: "2",
          name: "Holi",
          date: "2026-03-17",
          category: "Major Festival",
          description: "Festival of Colors",
          isPremium: false,
          imageUrl: "https://example.com/holi.jpg",
        },
      ],
      pagination: {
        page,
        limit,
        total: 50,
        totalPages: 5,
      },
    };
  },

  /**
   * GET /api/festivals/:id
   * Get festival by ID
   */
  getById: async (id: string) => {
    await delay(500);
    return {
      success: true,
      data: {
        id,
        name: "Mahashivratri",
        date: "2026-03-10",
        category: "Major Festival",
        description: "The Great Night of Shiva, a Hindu festival celebrated annually.",
        significance: "Marks the convergence of Shiva and Shakti.",
        rituals: "Fasting, night-long vigil, offering of Bilva leaves",
        mantras: "Om Namah Shivaya, Mahamrityunjaya Mantra",
        audioUrl: "https://example.com/mahashivratri-mantras.mp3",
        isPremium: false,
      },
    };
  },

  /**
   * GET /api/festivals/upcoming
   * Get upcoming festivals
   */
  getUpcoming: async (limit: number = 5) => {
    await delay(500);
    return {
      success: true,
      data: [
        {
          id: "1",
          name: "Mahashivratri",
          date: "2026-03-10",
          daysUntil: 4,
        },
        {
          id: "2",
          name: "Holi",
          date: "2026-03-17",
          daysUntil: 11,
        },
      ],
    };
  },
};

// ============================================
// ASTROLOGY API
// ============================================

export const AstrologyAPI = {
  /**
   * GET /api/astrology/horoscope/:rashi
   * Get daily horoscope by rashi
   */
  getDailyHoroscope: async (rashi: string) => {
    await delay(500);
    return {
      success: true,
      data: {
        rashi,
        date: "2026-03-06",
        prediction: "Today is an auspicious day for new beginnings...",
        lucky_number: 7,
        lucky_color: "Green",
        mood: "Positive",
        isPremium: false,
      },
    };
  },

  /**
   * POST /api/astrology/kundali/generate
   * Generate Kundali chart
   */
  generateKundali: async (birthDetails: {
    date: string;
    time: string;
    place: string;
    latitude: number;
    longitude: number;
  }) => {
    await delay(1000);
    return {
      success: true,
      data: {
        rashi: "Vrishabha",
        nakshatra: "Rohini",
        lagna: "Mesha",
        chartData: {}, // Complex chart calculation data
        dasha: "Venus Mahadasha",
        isPremiumContent: false,
      },
    };
  },

  /**
   * POST /api/astrology/compatibility
   * Check zodiac compatibility
   */
  checkCompatibility: async (rashi1: string, rashi2: string) => {
    await delay(500);
    return {
      success: true,
      data: {
        rashi1,
        rashi2,
        score: 85,
        compatibility: "Excellent",
        description: "High compatibility with strong emotional bond",
        isPremium: true,
      },
    };
  },
};

// ============================================
// PUJA API
// ============================================

export const PujaAPI = {
  /**
   * GET /api/pujas
   * Get all pujas
   */
  getAll: async (category?: string) => {
    await delay(500);
    return {
      success: true,
      data: [
        {
          id: "1",
          name: "Ganesh Puja",
          category: "Daily Puja",
          duration: "30 minutes",
          difficulty: "Beginner",
          isPremium: false,
        },
        {
          id: "2",
          name: "Lakshmi Puja",
          category: "Special Occasion",
          duration: "45 minutes",
          difficulty: "Intermediate",
          isPremium: true,
        },
      ],
    };
  },

  /**
   * GET /api/pujas/:id
   * Get puja details
   */
  getById: async (id: string) => {
    await delay(500);
    return {
      success: true,
      data: {
        id,
        name: "Ganesh Puja",
        description: "Daily worship of Lord Ganesha",
        materials: ["Flowers", "Incense", "Diya", "Prasad"],
        steps: [
          "Light the diya",
          "Offer flowers",
          "Chant mantras",
          "Perform aarti",
        ],
        mantras: ["Om Gan Ganapataye Namah"],
        audioUrl: "https://example.com/ganesh-puja.mp3",
        videoUrl: "https://example.com/ganesh-puja.mp4",
        isPremium: false,
      },
    };
  },
};

// ============================================
// SHOP API
// ============================================

export const ShopAPI = {
  /**
   * GET /api/shop/products
   * Get all products
   */
  getProducts: async (category?: string, page: number = 1) => {
    await delay(500);
    return {
      success: true,
      data: [
        {
          id: "1",
          name: "Premium Incense Sticks",
          category: "Pooja Samagri",
          price: 299,
          originalPrice: 399,
          discount: 25,
          rating: 4.5,
          inStock: true,
          imageUrl: "https://example.com/incense.jpg",
        },
        {
          id: "2",
          name: "Brass Diya Set (5 pieces)",
          category: "Lamps & Diyas",
          price: 799,
          originalPrice: 999,
          discount: 20,
          rating: 4.8,
          inStock: true,
          imageUrl: "https://example.com/diya.jpg",
        },
      ],
      pagination: {
        page,
        total: 100,
        totalPages: 10,
      },
    };
  },

  /**
   * POST /api/shop/orders
   * Place an order
   */
  placeOrder: async (orderData: {
    items: Array<{ productId: string; quantity: number }>;
    address: object;
    paymentMethod: string;
  }) => {
    await delay(1000);
    return {
      success: true,
      data: {
        orderId: "ORD-" + Date.now(),
        status: "confirmed",
        estimatedDelivery: "2026-03-10",
        trackingUrl: "https://track.vedictime.com/ORD-123456",
      },
    };
  },
};

// ============================================
// USER API
// ============================================

export const UserAPI = {
  /**
   * GET /api/users/profile
   * Get user profile
   */
  getProfile: async () => {
    await delay(500);
    return {
      success: true,
      data: {
        id: "user-123",
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        phone: "+91 9876543210",
        birthDate: "1990-05-15",
        birthTime: "06:30",
        birthPlace: "Varanasi, Uttar Pradesh",
        rashi: "Vrishabha (Taurus)",
        nakshatra: "Rohini",
        isPremium: false,
        subscriptionExpiry: null,
      },
    };
  },

  /**
   * PUT /api/users/profile
   * Update user profile
   */
  updateProfile: async (profileData: object) => {
    await delay(500);
    return {
      success: true,
      message: "Profile updated successfully",
      data: profileData,
    };
  },

  /**
   * GET /api/users/preferences
   * Get user preferences
   */
  getPreferences: async () => {
    await delay(300);
    return {
      success: true,
      data: {
        language: "english",
        calendarType: "hindu",
        notifications: {
          dailyPanchang: true,
          festivalAlerts: true,
          astrologyUpdates: true,
        },
        theme: "light",
      },
    };
  },
};

// ============================================
// NOTIFICATIONS API
// ============================================

export const NotificationsAPI = {
  /**
   * GET /api/notifications
   * Get user notifications
   */
  getAll: async () => {
    await delay(500);
    return {
      success: true,
      data: [
        {
          id: "1",
          title: "Mahashivratri Tomorrow",
          message: "Prepare for the great night of Shiva",
          type: "festival",
          read: false,
          timestamp: "2026-03-05T10:00:00Z",
        },
        {
          id: "2",
          title: "Your Daily Horoscope",
          message: "Check your horoscope for today",
          type: "astrology",
          read: false,
          timestamp: "2026-03-06T06:00:00Z",
        },
      ],
    };
  },

  /**
   * PUT /api/notifications/:id/read
   * Mark notification as read
   */
  markAsRead: async (id: string) => {
    await delay(300);
    return {
      success: true,
      message: "Notification marked as read",
    };
  },
};

// ============================================
// SUBSCRIPTION API
// ============================================

export const SubscriptionAPI = {
  /**
   * GET /api/subscriptions/plans
   * Get available subscription plans
   */
  getPlans: async () => {
    await delay(500);
    return {
      success: true,
      data: [
        {
          id: "basic",
          name: "Basic",
          price: 0,
          duration: "Forever",
          features: [
            "Daily Panchang",
            "Basic Horoscope",
            "Festival Calendar",
          ],
        },
        {
          id: "premium-monthly",
          name: "Premium Monthly",
          price: 199,
          duration: "1 Month",
          features: [
            "All Basic Features",
            "Detailed Kundali",
            "Premium Predictions",
            "Ad-free Experience",
            "Priority Support",
          ],
        },
        {
          id: "premium-yearly",
          name: "Premium Yearly",
          price: 1999,
          duration: "1 Year",
          discount: "Save ₹390",
          features: [
            "All Premium Features",
            "Personal Astrologer Consultation",
            "Exclusive Content",
            "Best Value",
          ],
        },
      ],
    };
  },

  /**
   * POST /api/subscriptions/purchase
   * Purchase subscription
   */
  purchase: async (planId: string, paymentMethod: string) => {
    await delay(1000);
    return {
      success: true,
      data: {
        subscriptionId: "SUB-" + Date.now(),
        planId,
        status: "active",
        startDate: "2026-03-06",
        endDate: "2026-04-06",
      },
    };
  },
};

// Export all APIs
export const API = {
  Panchang: PanchangAPI,
  Festivals: FestivalsAPI,
  Astrology: AstrologyAPI,
  Puja: PujaAPI,
  Shop: ShopAPI,
  User: UserAPI,
  Notifications: NotificationsAPI,
  Subscription: SubscriptionAPI,
};
