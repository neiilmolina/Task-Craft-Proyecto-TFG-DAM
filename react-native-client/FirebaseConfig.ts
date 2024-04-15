// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCARPCdCGNopVD0wESZYsZJXCqpY6aN3_E",
  authDomain: "tfg-base-de-datos-b7c3d.firebaseapp.com",
  projectId: "tfg-base-de-datos-b7c3d",
  storageBucket: "tfg-base-de-datos-b7c3d.appspot.com",
  messagingSenderId: "112619909842",
  appId: "1:112619909842:web:19708f7351c1392b97730b",
  measurementId: "G-G0PB77F62M"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);