/**
 * Authentication Service
 * Handles user authentication, session management, and token verification
 */

import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

export interface AuthResponse {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Register new user
 */
export async function registerUser(
  email: string,
  password: string,
  userData: {
    name: string;
    language?: string;
    phone?: string;
  }
): Promise<AuthResponse> {
  try {
    // Validate input
    if (!email || !password || !userData.name) {
      return { success: false, error: "Missing required fields" };
    }

    if (password.length < 8) {
      return { success: false, error: "Password must be at least 8 characters" };
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm since email server not configured
      user_metadata: {
        name: userData.name,
        language: userData.language || 'en',
        phone: userData.phone || '',
        role: 'user',
        subscription: 'free',
        createdAt: new Date().toISOString(),
      },
    });

    if (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.message };
    }

    // Store additional user data in KV store
    await supabase
      .from('kv_store_e18c4393')
      .insert({
        key: `user:${data.user.id}`,
        value: {
          userId: data.user.id,
          email: data.user.email,
          name: userData.name,
          language: userData.language || 'en',
          phone: userData.phone || '',
          role: 'user',
          subscription: 'free',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      });

    return {
      success: true,
      data: {
        userId: data.user.id,
        email: data.user.email,
        name: userData.name,
      }
    };
  } catch (err) {
    console.error("Registration exception:", err);
    return { success: false, error: "Registration failed" };
  }
}

/**
 * Login user
 */
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    if (!email || !password) {
      return { success: false, error: "Missing email or password" };
    }

    // This returns session data including access_token
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error);
      return { success: false, error: "Invalid email or password" };
    }

    return {
      success: true,
      data: {
        accessToken: data.session.access_token,
        refreshToken: data.session.refresh_token,
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name,
        }
      }
    };
  } catch (err) {
    console.error("Login exception:", err);
    return { success: false, error: "Login failed" };
  }
}

/**
 * Verify user token and return user data
 */
export async function verifyToken(token: string): Promise<AuthResponse> {
  try {
    if (!token) {
      return { success: false, error: "No token provided" };
    }

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return { success: false, error: "Invalid or expired token" };
    }

    return {
      success: true,
      data: {
        userId: data.user.id,
        email: data.user.email,
        role: data.user.user_metadata?.role || 'user',
      }
    };
  } catch (err) {
    console.error("Token verification exception:", err);
    return { success: false, error: "Token verification failed" };
  }
}

/**
 * Logout user (revoke token)
 */
export async function logoutUser(token: string): Promise<AuthResponse> {
  try {
    const { error } = await supabase.auth.admin.signOut(token);

    if (error) {
      return { success: false, error: "Logout failed" };
    }

    return { success: true, data: { message: "Logged out successfully" } };
  } catch (err) {
    console.error("Logout exception:", err);
    return { success: false, error: "Logout failed" };
  }
}

/**
 * Social OAuth login
 */
export async function socialLogin(provider: 'google' | 'facebook'): Promise<AuthResponse> {
  try {
    // Note: This requires configuration at https://supabase.com/docs/guides/auth/social-login
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: {
        url: data.url,
        provider: data.provider,
      }
    };
  } catch (err) {
    console.error("Social login exception:", err);
    return { success: false, error: "Social login failed" };
  }
}
