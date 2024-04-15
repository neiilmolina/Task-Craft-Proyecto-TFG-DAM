import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Android: 112619909842-ne4a0gb5kuf15ngiqlc59iqppu9cl8h2.apps.googleusercontent.com