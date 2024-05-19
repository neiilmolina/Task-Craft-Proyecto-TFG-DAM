import { Provider } from "react-redux";
import { store } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./modules/user/navigation/AuthNavigator";
import MyTabs from "./app/Navigation/MainMenuNavigation";
import useCurrentUser from "./modules/user/hooks/useCurrentUser";
import { View, Text } from "react-native";

export default function App() {
  const { user, loading } = useCurrentUser()

  if (loading) {
    return (
      <View>
        <Text>Cargando</Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {user ? <MyTabs /> : <AuthNavigator />} 
      </NavigationContainer>
    </Provider>
  );
} 
