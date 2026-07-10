import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBdIzdR4dV_JpveJeGsU0nVrhW4-XEFCuc",
  authDomain: "bogar-sun-management.firebaseapp.com",
  projectId: "bogar-sun-management",
  storageBucket: "bogar-sun-management.firebasestorage.app",
  messagingSenderId: "467654257218",
  appId: "1:467654257218:web:53a675e3e8707e2d4d5bdb",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;