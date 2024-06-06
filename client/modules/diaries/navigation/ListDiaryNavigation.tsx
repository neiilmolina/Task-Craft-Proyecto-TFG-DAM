import { createStackNavigator } from "@react-navigation/stack";
import AddDiaryScreen from "../screens/AddDiaryScreen";
import Details from "../screens/Details";
import List from "../screens/List";
import { DiaryUI } from "../store/interfaces";

export type ListNavigationParamList = {
  List: undefined;
  AddDiaryScreen: undefined;
  Details: { diary: DiaryUI }; // Define los parámetros que se pasarán a la pantalla Details
};

const Stack = createStackNavigator();

const ListDiaryNavigation = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Lista de diarios"
          component={List}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Añadir Diario" component={AddDiaryScreen} />
        <Stack.Screen name="Detalles del diario" component={Details} />
      </Stack.Navigator>
    );
  };
  
  export default ListDiaryNavigation;