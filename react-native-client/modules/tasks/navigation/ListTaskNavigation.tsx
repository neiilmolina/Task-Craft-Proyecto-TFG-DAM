import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddTaskScreen from "../screens/AddTaskScreen";
import List from "../screens/List";
import Details from "../screens/Details";
import { TaskWithId } from "../store/interfaces";

export type TaskNavigationParamList = {
  List: undefined;
  AddTaskScreen: undefined;
  Details: { task: TaskWithId }; // Define los parámetros que se pasarán a la pantalla Details
};

const Stack = createStackNavigator();

const ListTaskNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Añadir Tarea" component={AddTaskScreen} />
      <Stack.Screen name="Detalles" component={Details} />
    </Stack.Navigator>
  );
};

export default ListTaskNavigation;
