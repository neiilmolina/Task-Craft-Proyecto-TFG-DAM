import { useState } from "react";
import { FIREBASE_AUTH } from "../../../../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ToastAndroid } from "react-native";
import { validatePassword } from "../../validations/validations";

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
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    let correctValidation = false;
    let newUserId = null;
    setLoading(true);
    try {
      const isPasswordValid = validatePassword(password);
      if (!isPasswordValid) {
        throw new Error("Password validation failed");
      }
  
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      newUserId = response.user.uid; // Obtenemos el ID del usuario
      ToastAndroid.show("Registro realizado", ToastAndroid.SHORT);
      correctValidation = true;
    } catch (e: any) {
      console.log(e);
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  
    return { correctValidation, newUserId }; // Devolvemos el ID del usuario
  };
  
  
  return { loading, signIn, signUp };
};
