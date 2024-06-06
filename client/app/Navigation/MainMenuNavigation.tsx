import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';

import ListTaskNavigation from "../../modules/tasks/navigation/ListTaskNavigation";
import SettingsNavigator from "../../modules/user/navigation/SettingsNavigation";
import ListDiaryNavigation from "../../modules/diaries/navigation/ListDiaryNavigation";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
        initialRouteName="Tareas"
        screenOptions={{
          tabBarActiveTintColor: '#1A659E',
          tabBarInactiveTintColor: 'gray',
        }}
    >
      <Tab.Screen 
        name="Tareas" 
        component={ListTaskNavigation} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="tasks" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Diarios" 
        component={ListDiaryNavigation} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="book" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Ajustes" 
        component={SettingsNavigator} 
        options={{ 
          tabBarIcon: ({ color, size }) => (
            <Icon name="cogs" color={color} size={size} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}
