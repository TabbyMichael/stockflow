import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAN7gL2QQTfCQngVQgmZ20UGjyTXDuQhlA",
  authDomain: "stockflow-d2f3f.firebaseapp.com",
  projectId: "stockflow-d2f3f",
  storageBucket: "stockflow-d2f3f.firebasestorage.app",
  messagingSenderId: "287381457743",
  appId: "1:287381457743:web:87f69c6beaf03fa2b0133a",
  measurementId: "G-VWR22X8H7N"
};

// Initialize Firebase
export const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const analytics = typeof window !== 'undefined' ? getAnalytics(firebaseApp) : null; 

// Enable phone auth persistence
auth.settings.appVerificationDisabledForTesting = process.env.NODE_ENV === 'development'; 