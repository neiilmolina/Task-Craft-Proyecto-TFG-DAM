import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Settings from "../screens/Settings";

export type AuthNavigationParamList = {
  Login: undefined;
  Register: undefined;
  // Settings: undefined;
  // Otras pantallas de tu aplicación y sus parámetros si los tienen
};

const Stack = createStackNavigator<AuthNavigationParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
