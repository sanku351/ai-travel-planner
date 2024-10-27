// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

let app;
let auth;
let db;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "travel-fc4da.firebaseapp.com",
  projectId: "travel-fc4da",
  storageBucket: "travel-fc4da.appspot.com",
  messagingSenderId: "459145893129",
  appId: "1:459145893129:web:f01ea20a6ba010347f2fd8",
  measurementId: "G-93LX06T7K3"
};

// Initialize Firebase
export const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
  }
  if (!auth) {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
  }
  if (!db) {
    db = getFirestore(app);
  }
  return { app, auth, db };
};

export { auth, db }