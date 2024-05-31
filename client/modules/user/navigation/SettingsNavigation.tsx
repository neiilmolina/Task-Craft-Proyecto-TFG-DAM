import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Settings from "../screens/Settings";
import PasswordScreen from "../screens/PasswordScreen";
import DeleteUserScreen from "../screens/DeleteUserScreen";
import ChangeEmailScreen from "../screens/ChangeEmailScreen";

export type SettingsNavigationParamList = {
  Settings: undefined;
  PasswordScreen: undefined;
  EmailScreen: undefined;
  DeleteUserScreen: undefined;
  ChangeEmailScreen: undefined;
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
        name="ChangeEmailScreen"
        component={ChangeEmailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeleteUserScreen"
        component={DeleteUserScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
