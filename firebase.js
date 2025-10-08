// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzOXWUO_0uLl6C5bz7dnf-vQMsD18cQUc",
  authDomain: "test2-e2a3e.firebaseapp.com",
  databaseURL: "https://test2-e2a3e-default-rtdb.firebaseio.com",
  projectId: "test2-e2a3e",
  storageBucket: "test2-e2a3e.firebasestorage.app",
  messagingSenderId: "422029520509",
  appId: "1:422029520509:web:cc6560006f0157edf78b14",
  measurementId: "G-TQLVTCXV25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
export const auth = getAuth(app);
export const db = getDatabase(app);
