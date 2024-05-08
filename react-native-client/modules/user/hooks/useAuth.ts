import { useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ToastAndroid } from "react-native";

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
    setLoading(true);
    try {
      // Validar longitud de la contraseña
      if (password.length < 8 || password.length > 20) {
        const passwordError = "La contraseña debe tener entre 8 y 20 caracteres."
        ToastAndroid.show("La contraseña debe tener entre 8 y 20 caracteres.", ToastAndroid.SHORT);
        throw new Error(passwordError);

      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      ToastAndroid.show("Registro realizado", ToastAndroid.SHORT);

    } catch (e: any) {
      console.log(e);
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signIn, signUp };
};
