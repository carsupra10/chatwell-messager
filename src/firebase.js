import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCR8YftV3NFxj4EOWK9CUg7qyBYUIQDJxw",
  authDomain: "chatwell-f6d64.firebaseapp.com",
  databaseURL: "https://chatwell-f6d64-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatwell-f6d64",
  storageBucket: "chatwell-f6d64.appspot.com",
  messagingSenderId: "840890098692",
  appId: "1:840890098692:web:2964f92d61f78f2c5f4151",
  measurementId: "G-HFFK6220FT"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
