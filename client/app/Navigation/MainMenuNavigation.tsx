import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';

import ListTaskNavigation from "../modules/tasks/navigation/ListTaskNavigation";
import SettingsNavigator from "../modules/users/navigation/SettingsNavigation";
import ListDiaryNavigation from "../modules/diaries/navigation/ListDiaryNavigation";
import CalendarTaskNavigation from "../modules/tasks/navigation/CalendarTaskNavigation";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  // Define la navegación mediante pestañas con BottomTabNavigator
  return (
    <Tab.Navigator
        initialRouteName="Tareas"
        screenOptions={{
          tabBarActiveTintColor: '#1A659E',
          tabBarInactiveTintColor: 'gray',
        }}
    >
      {/* Pestaña para listar tareas */}
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
      {/* Pestaña para la navegación de calendario */}
      <Tab.Screen
        name={"Navegación calendario"}
        component={CalendarTaskNavigation}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar" color={color} size={size} />
          ),
        }} 
      />
      {/* Pestaña para listar diarios */}
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
      {/* Pestaña para los ajustes */}
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
