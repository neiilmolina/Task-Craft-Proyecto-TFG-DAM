import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged, User } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import Login from "./modules/user/components/Login";
import List from "./app/screens/List";
import Details from "./app/screens/Details";

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
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="Inside"
            component={InsideLayout}
            options={{ headerShown: true }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
