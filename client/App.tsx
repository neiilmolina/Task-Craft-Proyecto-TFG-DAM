import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./modules/user/navigation/AuthNavigator";
import MyTabs from "./app/Navigation/MainMenuNavigation";
import useCurrentUser from "./modules/user/hooks/Authentifcation/useCurrentUser";
import { View, Text } from "react-native";
import { usePushNotifications } from "./app/usePushNotifications";

export default function App() {
  const { user, loading } = useCurrentUser();

  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  if (loading) {
    return (
      <View>
        <Text>Cargando</Text>
      </View>
    );
  }

  console.log(expoPushToken?.data)
  console.log(`Notification: ${data}`);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? <MyTabs /> : <AuthNavigator />}
      </NavigationContainer>
    </Provider>
  );
}
