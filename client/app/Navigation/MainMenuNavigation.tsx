import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ListTaskNavigation from "../../modules/tasks/navigation/ListTaskNavigation";
import SettingsNavigator from "../../modules/user/navigation/SettingsNavigation";
import ListDiaryNavigation from "../../modules/diaries/navigation/ListDiaryNavigation";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
        initialRouteName="Tareas"
    >
      <Tab.Screen name="Tareas" component={ListTaskNavigation} options={{headerShown: false}} />
      <Tab.Screen name="Diarios" component={ListDiaryNavigation} options={{headerShown: false}}/>
      <Tab.Screen name="Ajustes" component={SettingsNavigator} />
    </Tab.Navigator>
  );
}
