import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import MyTabs from "./app/navigation/MainMenuNavigation";
import useCurrentUser from "./modules/user/hooks/Authentifcation/useCurrentUser";
import { View, Text } from "react-native";
import { usePushNotifications } from "./app/hooks/usePushNotifications";
import { restoreNotificationsOnAppRestart } from "./modules/tasks/hooks/taskNotifications";
import AuthNavigator from "./modules/user/navigation/AuthNavigator";

export default function App() {
  const { user, loading } = useCurrentUser();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [user]);

  restoreNotificationsOnAppRestart();
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
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
