import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
const API_FIREBASE = import.meta.env.VITE_FIREBASE_API;

const firebaseConfig = {
  apiKey: API_FIREBASE,
  authDomain: "cyberlooper-login.firebaseapp.com",
  projectId: "cyberlooper-login",
  storageBucket: "cyberlooper-login.firebasestorage.app",
  messagingSenderId: "373615051146",
  appId: "1:373615051146:web:8b1dcf595f0c0afc2e4873",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ✅ Force account selection for Google login
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const microsoftProvider = new OAuthProvider("microsoft.com"); // Microsoft Provider

// ✅ Google Sign-In with forced account selection
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google User:", result.user);

    const idToken = await result.user.getIdToken();
    console.log("Firebase ID Token:", idToken);

    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

// ✅ Facebook Sign-In

// ✅ Microsoft Sign-In
const signInWithMicrosoft = async () => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    console.log("Microsoft User:", result.user);

    const idToken = await result.user.getIdToken();
    console.log("Firebase ID Token:", idToken);

    return result.user;
  } catch (error) {
    console.error("Microsoft Sign-In Error:", error);
    return null;
  }
};

// ✅ Sign out function to clear session
// const logoutUser = async () => {
//   try {
//     await signOut(auth);
//     console.log("User signed out successfully.");
//   } catch (error) {
//     console.error("Logout Error:", error);
//   }
// };
const logoutUser = async () => {
  try {
    // Check if the user is logged in via Firebase (Firebase Auth)
    if (auth.currentUser) {
      // Sign out the user from Firebase
      await signOut(auth);
      console.log("User signed out from Firebase.");
    }
    // If no Firebase user is logged in, handle normal JWT-based logout
    console.log("User signed out from normal auth.");
    localStorage.removeItem("user_token"); // Remove JWT token from localStorage
    sessionStorage.removeItem("user_token"); // Remove JWT token from sessionStorage

    // After logout, navigate to the login page
    navigate("/login");
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth, signInWithGoogle, signInWithMicrosoft, logoutUser };
