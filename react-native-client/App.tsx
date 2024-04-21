import React, { useEffect, useState } from "react";

import { Provider } from "react-redux";
import { store } from "./store";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";

import List from "./modules/tasks/screens/List";
import Details from "./modules/tasks/screens/Details";
import AuthNavigator from './modules/user/components/AuthNavigator'; // Asegúrate de importar tu AuthNavigator

const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name="MyTodos" component={List} />
      <InsideStack.Screen name="Details" component={Details} />
    </InsideStack.Navigator>
  );
}

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
          <InsideLayout /> // Renderiza InsideLayout si hay un usuario autenticado
        ) : (
          <AuthNavigator /> // Renderiza AuthNavigator si no hay usuario autenticado
        )}
      </NavigationContainer>
    </Provider>
  );
}
