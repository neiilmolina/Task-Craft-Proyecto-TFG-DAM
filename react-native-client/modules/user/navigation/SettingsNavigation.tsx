import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Settings";
import PasswordScreen from "../screens/PasswordScreen";
import EmailScreen from "../screens/EmailScreen";

export type SettingsNavigationParamList = {
  Settings: undefined;
  PasswordScreen: undefined;
  EmailScreen: undefined;
};

const Stack = createStackNavigator<SettingsNavigationParamList>();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EmailScreen"
        component={EmailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
