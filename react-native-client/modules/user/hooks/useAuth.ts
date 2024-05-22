import { useState } from "react";
import { FIREBASE_AUTH } from "../../../FirebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ToastAndroid } from "react-native";
import { validatePassword } from "../validations/validations";

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
      console.log(response);
      ToastAndroid.show("Registro realizado", ToastAndroid.SHORT);
      await FIREBASE_AUTH.signOut();
      correctValidation = true;
    } catch (e: any) {
      console.log(e);
      ToastAndroid.show(e.message, ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }

    return { correctValidation };
  };
  return { loading, signIn, signUp };
};
