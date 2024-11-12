import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Only initialize Firebase on the client side
const initializeFirebase = (): FirebaseApp | null => {
  if (typeof window === 'undefined') return null;
  
  const isFirebaseConfigValid = Object.values(firebaseConfig).every(value => value !== undefined);
  if (!isFirebaseConfigValid) {
    console.error('Firebase configuration is incomplete. Check your environment variables.');
    return null;
  }

  return getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
};

export const firebaseApp = initializeFirebase();

export const auth: Auth | null = typeof window !== 'undefined' && firebaseApp ? getAuth(firebaseApp) : null;
export const db: Firestore | null = typeof window !== 'undefined' && firebaseApp ? getFirestore(firebaseApp) : null;
export const analytics: Analytics | null = typeof window !== 'undefined' && firebaseApp ? getAnalytics(firebaseApp) : null;

// Enable phone auth persistence only if auth is initialized and in browser
if (typeof window !== 'undefined' && auth) {
  auth.settings.appVerificationDisabledForTesting = process.env.NODE_ENV === 'development';
}