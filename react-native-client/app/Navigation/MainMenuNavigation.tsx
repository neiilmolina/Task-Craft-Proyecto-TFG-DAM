import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListTaskNavigation from "../../modules/tasks/navigation/ListTaskNavigation";
import SettingsNavigator from "../../modules/user/navigation/SettingsNavigation";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
        initialRouteName="ListTaskNavigation"
    >
      <Tab.Screen name="ListTaskNavigation" component={ListTaskNavigation} options={{headerShown: false}} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
}
