

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyTabs from "./MainMenuNavigation";
import Login from "../../modules/user/screens/Login";

export type AuthNavigationParamList = {
  Login: undefined;
  MyTabs: undefined;
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
        name="MyTabs"
        component={MyTabs}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
