import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxYjP_aoXm9HeAqqXcL7wF8hAyactF5zs",
  authDomain: "grindset-b4585.firebaseapp.com",
  projectId: "grindset-b4585",
  storageBucket: "grindset-b4585.firebasestorage.app",
  messagingSenderId: "680329202311",
  appId: "1:680329202311:web:75b95a47cf99528ed7c622",
  measurementId: "G-SKZ3FCWYBR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
