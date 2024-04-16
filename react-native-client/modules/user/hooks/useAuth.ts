import { useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (e: any) {
      console.log(e);
      alert("Login failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("Check your emails!");
    } catch (e: any) {
      console.log(e);
      alert("Registration failed: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signIn, signUp };
};
