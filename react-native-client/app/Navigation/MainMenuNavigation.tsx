import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Settings from "../../modules/user/screens/Settings";
import ListTaskNavigation from "../../modules/tasks/navigation/ListTaskNavigation";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
        initialRouteName="ListTaskNavigation"
    >
      <Tab.Screen name="ListTaskNavigation" component={ListTaskNavigation} options={{headerShown: false}} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}
