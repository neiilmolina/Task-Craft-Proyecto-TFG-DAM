import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./app/navigation/MainMenuNavigation";
import useCurrentUser from "./app/modules/users/hooks/Authentifcation/useCurrentUser";
import { View, Text } from "react-native";
import { usePushNotifications } from "./app/hooks/usePushNotifications";
import { restoreNotificationsOnAppRestart } from "./app/modules/tasks/hooks/taskNotifications";
import AuthNavigator from "./app/modules/users/navigation/AuthNavigator";

export default function App() {
  // Estado local para manejar la autenticación del usuario
  const { user, loading } = useCurrentUser();
  const [authenticated, setAuthenticated] = useState(false);

  // Efecto secundario para actualizar el estado de autenticación
  useEffect(() => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [user]);

  // Restaurar notificaciones al reiniciar la aplicación
  restoreNotificationsOnAppRestart();
  // Manejar las notificaciones push
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);

  // Renderizar la aplicación dependiendo del estado de autenticación
  if (loading) {
    return (
      <View>
        <Text>Cargando</Text>
      </View>
    );
  }

  console.log(expoPushToken?.data);
  console.log(`Notification: ${data}`);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {authenticated ? <MyTabs /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
