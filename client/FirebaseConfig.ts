// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage"; // Importa getStorage para configurar Firebase Storage
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firebase services
export { firebase };
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP); // Configura y exporta Firebase Storage
