import React, { useEffect, useState } from "react";

import { Provider } from "react-redux";
import { store } from "./store";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import AuthNavigator from "./modules/user/navigation/AuthNavigator"; // Asegúrate de importar tu AuthNavigator
import TaskNavigation from "./modules/tasks/navigation/ListTaskNavigation";
import MyTabs from "./Navigation";


const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? (
          // Renderiza InsideLayout si hay un usuario autenticado
          <MyTabs/>
        ) : (
          <AuthNavigator /> // Renderiza AuthNavigator si no hay usuario autenticado
        )}
      </NavigationContainer>
    </Provider>
  );
}
