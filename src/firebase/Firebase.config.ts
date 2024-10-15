import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmVDciJVNY_f1wktde1F_8UIt12Pr5wDM",
  authDomain: "memorial-service-e5280.firebaseapp.com",
  projectId: "memorial-service-e5280",
  storageBucket: "memorial-service-e5280.appspot.com",
  messagingSenderId: "177158306385",
  appId: "1:177158306385:web:ff228d13df7e35dc275670",
  measurementId: "G-14F1112FT8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
