/**
 * Environment Configuration
 * All environment variables and configuration settings
 * NO HARDCODED SECRETS - all sensitive data from environment variables
 */

export const ENV = {
  // API Configuration
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  
  // Supabase Configuration (from existing info file)
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || '',
  
  // App Configuration
  APP_NAME: 'VedicTime',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  FEATURES: {
    SOCIAL_LOGIN: import.meta.env.VITE_ENABLE_SOCIAL_LOGIN === 'true',
    ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    PREMIUM_FEATURES: true,
  },
  
  // Rate Limiting (frontend side)
  RATE_LIMITS: {
    API_CALLS_PER_MINUTE: 100,
    KUNDALI_CREATION_PER_DAY: 10,
  },
  
  // Premium Features
  PREMIUM: {
    FREE_KUNDALI_LIMIT: 3,
    PREMIUM_PRICE: 499, // INR per month
    FEATURES: [
      'Unlimited Kundali Generation',
      'Ad-Free Experience',
      'Premium Content Access',
      'Offline Access',
      'Priority Support',
      'Advanced Predictions',
      'Detailed Reports',
      'Custom Notifications',
    ],
  },
  
  // Supported Languages
  LANGUAGES: [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'kn', name: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'മലയാളം' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'mr', name: 'मराठी' },
    { code: 'pa', name: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'ଓଡ଼ିଆ' },
  ],
  
  // Calendar Types
  CALENDAR_TYPES: [
    { value: 'hindu', label: 'Hindu Calendar', icon: '🕉️' },
    { value: 'vedic', label: 'Vedic Calendar', icon: '📿' },
    { value: 'tamil', label: 'Tamil Calendar', icon: '🛕' },
    { value: 'bengali', label: 'Bengali Calendar', icon: '🎭' },
    { value: 'gujarati', label: 'Gujarati Calendar', icon: '🪔' },
    { value: 'kannada', label: 'Kannada Calendar', icon: '🌺' },
    { value: 'malayalam', label: 'Malayalam Calendar', icon: '🥥' },
    { value: 'telugu', label: 'Telugu Calendar', icon: '🌸' },
    { value: 'marathi', label: 'Marathi Calendar', icon: '🪷' },
    { value: 'oriya', label: 'Oriya Calendar', icon: '🏛️' },
    { value: 'punjabi', label: 'Punjabi Calendar', icon: '⭐' },
    { value: 'jain', label: 'Jain Calendar', icon: '☸️' },
  ],
};

// Validate environment configuration on load
export function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required environment variables
  if (!ENV.API_BASE_URL) {
    errors.push('VITE_API_BASE_URL is not configured');
  }
  
  if (!ENV.SUPABASE_URL) {
    errors.push('VITE_SUPABASE_URL is not configured');
  }
  
  if (!ENV.SUPABASE_ANON_KEY) {
    errors.push('VITE_SUPABASE_ANON_KEY is not configured');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

// Log configuration status (without exposing secrets)
export function logEnvironmentStatus() {
  console.log('Environment Configuration:', {
    appName: ENV.APP_NAME,
    appVersion: ENV.APP_VERSION,
    apiConfigured: !!ENV.API_BASE_URL,
    supabaseConfigured: !!ENV.SUPABASE_URL,
    features: ENV.FEATURES,
  });
}
