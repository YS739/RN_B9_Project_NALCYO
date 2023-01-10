// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";

// RN 오늘 날C요? project
const firebaseConfig = {
  apiKey: "AIzaSyDNN0EHaDE5A1ZgiI42ZdNZR6CE4JhXFLE",
  authDomain: "rn-nallcyo.firebaseapp.com",
  projectId: "rn-nallcyo",
  storageBucket: "rn-nallcyo.appspot.com",
  messagingSenderId: "693334617206",
  appId: "1:693334617206:web:dc3ad4c9867971e7108357",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
