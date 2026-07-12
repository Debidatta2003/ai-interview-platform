import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "aiinterwiew.firebaseapp.com",
  projectId: "aiinterwiew",
  storageBucket: "aiinterwiew.firebasestorage.app",
  messagingSenderId: "302260742408",
  appId: "1:302260742408:web:e6f95797ece3811d6c24bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
