import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./MainMenuNavigation";
import AuthNavigator from "../modules/users/navigation/AuthNavigator";
import Login from "../modules/users/screens/Login";
import Register from "../modules/users/screens/Register";
export type AuthNavigationParamList = {
  Login: undefined;
  Register: undefined;
  MyTabs: undefined;
};

const Stack = createStackNavigator<AuthNavigationParamList>();

const AppNavigation = () => {
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
      <Stack.Screen
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
};

export default AppNavigation;
