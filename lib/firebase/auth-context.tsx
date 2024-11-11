"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { 
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  PhoneAuthProvider,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithCredential
} from "firebase/auth";
import { auth } from "./config";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  signInWithPhone: (phoneNumber: string) => Promise<any>;
  confirmPhoneCode: (verificationId: string, code: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    recaptchaWidgetId: number;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const signInWithPhone = async (phoneNumber: string) => {
    try {
      // Clear existing recaptcha if it exists
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        const recaptchaElement = document.getElementById('recaptcha-container');
        if (recaptchaElement) {
          recaptchaElement.innerHTML = '';
        }
      }

      // Create new recaptcha verifier
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          throw new Error('reCAPTCHA expired. Please try again.');
        }
      });

      // Render the reCAPTCHA widget
      await window.recaptchaVerifier.render();
      
      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      return confirmationResult;
    } catch (error: any) {
      console.error("Error in signInWithPhone:", error);
      if (error.code === 'auth/invalid-phone-number') {
        throw new Error('Invalid phone number format');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many attempts. Please try again later');
      }
      throw error;
    }
  };

  const confirmPhoneCode = async (verificationId: string, code: string) => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      console.error("Error in confirmPhoneCode:", error);
      if (error.code === 'auth/invalid-verification-code') {
        throw new Error('Invalid verification code');
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      signIn: async (email: string, password: string) => {
        await signIn(email, password);
      },
      signUp,
      signInWithGoogle,
      logout,
      signInWithPhone,
      confirmPhoneCode,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 