import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Register from "../screens/Register";

export type AuthNavigationParamList = {
  Login: undefined;
  Register: undefined;
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
