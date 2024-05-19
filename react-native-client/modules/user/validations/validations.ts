import { ToastAndroid } from "react-native";

export const validatePassword = (password: string): boolean => {
  if (password.length < 8 || password.length > 20) {
    ToastAndroid.show("La contraseña debe tener entre 8 y 20 caracteres.", ToastAndroid.SHORT);
    return false;
  }
  return true;
};
