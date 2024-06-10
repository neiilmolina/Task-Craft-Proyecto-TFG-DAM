import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AddTaskScreen from "../screens/AddTaskScreen";
import List from "../screens/List";
import Details from "../screens/Details";
import { TaskUIWithID } from "../store/interfaces";

// Definición de los parámetros de navegación
export type TaskNavigationParamList = {
  List: undefined;
  AddTaskScreen: undefined;
  Details: { task: TaskUIWithID };
};

const Stack = createStackNavigator();

const ListTaskNavigation = () => {
  return (
    <Stack.Navigator>
      {/* Pantalla para mostrar la lista de tareas */}
      <Stack.Screen
        name="List"
        component={List}
        options={{ headerShown: false }}
      />
      {/* Pantalla para agregar una nueva tarea */}
      <Stack.Screen name="Añadir Tarea" component={AddTaskScreen} />
      {/* Pantalla para ver los detalles de una tarea */}
      <Stack.Screen name="Detalles" component={Details} />
    </Stack.Navigator>
  );
};

export default ListTaskNavigation;
