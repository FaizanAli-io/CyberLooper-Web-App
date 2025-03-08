import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  OAuthProvider, 
  signInWithPopup 
} from "firebase/auth";



const API_FIREBASE = import.meta.env.VITE_FIREBASE_API
const firebaseConfig = {
  apiKey: API_FIREBASE,
  authDomain: "cyberlooper-login.firebaseapp.com",
  projectId: "cyberlooper-login",
  storageBucket: "cyberlooper-login.firebasestorage.app",
  messagingSenderId: "373615051146",
  appId: "1:373615051146:web:8b1dcf595f0c0afc2e4873"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const microsoftProvider = new OAuthProvider('microsoft.com'); // Microsoft Provider

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google User:", result.user);
    const idToken = await result.user.getIdToken();
    console.log("Firebase ID Token: ", idToken);

    const response = await fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebase_token: idToken }),
    });

    console.log(response);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log("Facebook User:", result.user);
    return result.user;
  } catch (error) {
    console.error("Facebook Sign-In Error:", error);
    return null;
  }
};

const signInWithMicrosoft = async () => {
  try {
    const result = await signInWithPopup(auth, microsoftProvider);
    console.log("Microsoft User:", result.user);
    
    const idToken = await result.user.getIdToken();
    console.log("Firebase ID Token: ", idToken);

    // Send token to backend (if applicable)
    const response = await fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firebase_token: idToken }),
    });

    console.log("Backend Response: ", await response.json());
    return result.user;
  } catch (error) {
    console.error("Microsoft Sign-In Error:", error);
    return null;
  }
};


export { auth, signInWithGoogle, signInWithFacebook, signInWithMicrosoft };
