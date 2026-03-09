/**
 * Firebase Authentication Helper
 * Client-side auth operations using Firebase Auth SDK
 */

import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile,
  User
} from 'firebase/auth';
import { auth } from './firebase-config';
import { AuthAPI } from './api-service-firebase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
  phone?: string;
  language?: string;
}

/**
 * Register new user with email and password
 */
export async function registerWithEmail(credentials: RegisterCredentials) {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    // Update display name
    await updateProfile(userCredential.user, {
      displayName: credentials.name
    });

    // Get ID token
    const token = await userCredential.user.getIdToken();
    
    // Store token for API calls
    AuthAPI.setToken(token);

    // Call backend to create user profile in Firestore
    await AuthAPI.register({
      email: credentials.email,
      password: credentials.password,
      name: credentials.name,
      phone: credentials.phone,
      language: credentials.language,
    });

    return {
      success: true,
      user: userCredential.user,
      token
    };
  } catch (error: any) {
    console.error('Registration error:', error);
    return {
      success: false,
      error: error.message || 'Registration failed'
    };
  }
}

/**
 * Login with email and password
 */
export async function loginWithEmail(credentials: LoginCredentials) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    // Get ID token
    const token = await userCredential.user.getIdToken();
    
    // Store token for API calls
    AuthAPI.setToken(token);

    return {
      success: true,
      user: userCredential.user,
      token
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      error: error.message || 'Login failed'
    };
  }
}

/**
 * Login with Google
 */
export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    // Get ID token
    const token = await userCredential.user.getIdToken();
    
    // Store token for API calls
    AuthAPI.setToken(token);

    // Create user profile if new user
    if (userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime) {
      await AuthAPI.register({
        email: userCredential.user.email || '',
        password: '', // Not needed for OAuth
        name: userCredential.user.displayName || '',
        phone: userCredential.user.phoneNumber || '',
      });
    }

    return {
      success: true,
      user: userCredential.user,
      token
    };
  } catch (error: any) {
    console.error('Google login error:', error);
    return {
      success: false,
      error: error.message || 'Google login failed'
    };
  }
}

/**
 * Login with Facebook
 */
export async function loginWithFacebook() {
  try {
    const provider = new FacebookAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);

    // Get ID token
    const token = await userCredential.user.getIdToken();
    
    // Store token for API calls
    AuthAPI.setToken(token);

    // Create user profile if new user
    if (userCredential.user.metadata.creationTime === userCredential.user.metadata.lastSignInTime) {
      await AuthAPI.register({
        email: userCredential.user.email || '',
        password: '', // Not needed for OAuth
        name: userCredential.user.displayName || '',
        phone: userCredential.user.phoneNumber || '',
      });
    }

    return {
      success: true,
      user: userCredential.user,
      token
    };
  } catch (error: any) {
    console.error('Facebook login error:', error);
    return {
      success: false,
      error: error.message || 'Facebook login failed'
    };
  }
}

/**
 * Logout current user
 */
export async function logout() {
  try {
    // Call backend to revoke tokens
    await AuthAPI.logout();
    
    // Sign out from Firebase
    await signOut(auth);

    return { success: true };
  } catch (error: any) {
    console.error('Logout error:', error);
    return {
      success: false,
      error: error.message || 'Logout failed'
    };
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    return {
      success: true,
      message: 'Password reset email sent'
    };
  } catch (error: any) {
    console.error('Password reset error:', error);
    return {
      success: false,
      error: error.message || 'Failed to send reset email'
    };
  }
}

/**
 * Get current user's ID token
 */
export async function getCurrentUserToken(): Promise<string | null> {
  try {
    const user = auth.currentUser;
    if (!user) return null;
    
    const token = await user.getIdToken();
    AuthAPI.setToken(token);
    return token;
  } catch (error) {
    console.error('Get token error:', error);
    return null;
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return auth.onAuthStateChanged(async (user) => {
    if (user) {
      // User is signed in, get and store token
      const token = await user.getIdToken();
      AuthAPI.setToken(token);
    } else {
      // User is signed out
      AuthAPI.setToken(null);
    }
    callback(user);
  });
}

/**
 * Get current user
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
