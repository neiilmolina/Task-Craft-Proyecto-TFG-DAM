import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";

// Definición de los parámetros de navegación para AuthNavigator
export type AuthNavigationParamList = {
  Login: undefined;
  Register: undefined;
};

// Creación del Stack Navigator para la navegación entre pantallas de autenticación
const Stack = createStackNavigator<AuthNavigationParamList>();

// Componente funcional AuthNavigator que maneja la navegación de autenticación
const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Pantalla de inicio de sesión */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      {/* Pantalla de registro */}
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
