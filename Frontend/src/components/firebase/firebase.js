import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0Z-5vdNDPziW78jIYj_vdBLfei2BYymk",
  authDomain: "cyberloop-login.firebaseapp.com",
  projectId: "cyberloop-login",
  storageBucket: "cyberloop-login.firebasestorage.app",
  messagingSenderId: "924220288327",
  appId: "1:924220288327:web:16f00506e932a542223062",
  measurementId: "G-2KW92SHWLN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google User:", result.user);
    const idToken = await result.user.getIdToken(); // Firebase ID Token
    console.log("Firebase ID Token: ", idToken)

    // Send token to your backend
    const response = await fetch("http://127.0.0.1:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firebase_token: idToken }), // 🔥 Send idToken
    });

    console.log(response)
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


export { auth, signInWithGoogle, signInWithFacebook };
