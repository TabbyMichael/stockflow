import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Check if all required Firebase config values are present
const isFirebaseConfigValid = Object.values(firebaseConfig).every(value => value !== undefined);

if (!isFirebaseConfigValid) {
  console.error('Firebase configuration is incomplete. Check your environment variables.');
}

// Initialize Firebase only if config is valid
export const firebaseApp = isFirebaseConfigValid 
  ? (getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0])
  : null;

export const auth = firebaseApp ? getAuth(firebaseApp) : null;
export const db = firebaseApp ? getFirestore(firebaseApp) : null;
export const analytics = typeof window !== 'undefined' && firebaseApp ? getAnalytics(firebaseApp) : null;

// Enable phone auth persistence only if auth is initialized
if (auth) {
  auth.settings.appVerificationDisabledForTesting = process.env.NODE_ENV === 'development';
}